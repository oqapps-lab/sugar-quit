/**
 * playground.tsx — DEV ONLY. Delete before shipping.
 */
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function Playground() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Playground works ✓</Text>
      <Text style={styles.body}>Web rendering is fine.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fbf9f5' },
  content: { padding: 32, gap: 12 },
  title: { fontSize: 28, fontWeight: '800', color: '#31332f' },
  body: { fontSize: 16, color: '#5e605b' },
});
