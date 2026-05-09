import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { requestTrackingPermissionsAsync, getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import appsFlyer from 'react-native-appsflyer';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';

const ASC_APP_ID = '6764313527';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function bootstrapAttribution() {
  if (Platform.OS !== 'ios') return;

  let attStatus: string = 'unavailable';
  try {
    const current = await getTrackingPermissionsAsync();
    if (current.status === 'undetermined') {
      const res = await requestTrackingPermissionsAsync();
      attStatus = res.status;
    } else {
      attStatus = current.status;
    }
    crashlytics().log(`att_status:${attStatus}`);
  } catch (err) {
    crashlytics().log(`att_error:${String(err).slice(0, 100)}`);
  }

  appsFlyer.initSdk(
    {
      devKey: process.env.EXPO_PUBLIC_APPSFLYER_DEV_KEY ?? '',
      appId: ASC_APP_ID,
      isDebug: __DEV__,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
      timeToWaitForATTUserAuthorization: 10,
    },
    () => crashlytics().log('appsflyer_initialized'),
    (err) => crashlytics().log(`appsflyer_init_failed:${String(err).slice(0, 100)}`),
  );
}

export async function bootstrapPushPermission(): Promise<{ granted: boolean; fcmToken: string | null }> {
  if (!Device.isDevice) return { granted: false, fcmToken: null };

  const current = await Notifications.getPermissionsAsync();
  let granted = current.granted;
  if (!granted && current.canAskAgain) {
    const req = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: false, allowSound: true },
    });
    granted = req.granted;
  }
  crashlytics().log(`push_permission:${granted ? 'granted' : 'denied'}`);

  let fcmToken: string | null = null;
  if (granted) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      fcmToken = await messaging().getToken();
      crashlytics().log(`fcm_token_acquired:len=${fcmToken?.length ?? 0}`);
    } catch (err) {
      crashlytics().log(`fcm_token_failed:${String(err).slice(0, 100)}`);
    }
  }
  return { granted, fcmToken };
}

export async function scheduleCravingReminder(peakHour: number): Promise<string | null> {
  const granted = (await Notifications.getPermissionsAsync()).granted;
  if (!granted) return null;

  await cancelCravingReminder();

  const remindHour = peakHour === 0 ? 23 : peakHour - 1;
  const remindMinute = 30;
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your craving window is in 30 min',
      body: 'Open Sugar Quit before the wave hits — we\'ve got a 60-second SOS ready.',
      sound: true,
      data: { type: 'craving_reminder', peakHour },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: remindHour,
      minute: remindMinute,
    },
    identifier: 'sq.craving.daily',
  });
  return id;
}

export async function cancelCravingReminder() {
  await Notifications.cancelScheduledNotificationAsync('sq.craving.daily').catch(() => {});
}

export async function scheduleDailyCheckin(hour: number = 21, minute: number = 0): Promise<string | null> {
  const granted = (await Notifications.getPermissionsAsync()).granted;
  if (!granted) return null;
  await Notifications.cancelScheduledNotificationAsync('sq.checkin.daily').catch(() => {});
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'How was today?',
      body: '30 seconds to log your day — keeps the streak alive.',
      sound: false,
      data: { type: 'daily_checkin' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
    identifier: 'sq.checkin.daily',
  });
}
