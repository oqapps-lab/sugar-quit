// Web stub for react-native-worklets.
// On web there is no JS worklet thread — everything runs on the main thread.
export function runOnJS(fn) { return fn; }
export function runOnUI(fn) { return fn; }
export function makeShareable(value) { return value; }
export function useSharedValue(init) { return { value: init }; }
export function useWorkletCallback(fn) { return fn; }
export default {};
