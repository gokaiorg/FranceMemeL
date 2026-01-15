## 2024-05-23 - [VideoItem Keyboard Focus]
**Learning:** `TouchableOpacity` in React Native Web does not automatically expose `focused` state for custom styling (like hover).
**Action:** Manually add `onFocus` and `onBlur` handlers alongside `onMouseEnter`/`onMouseLeave` when custom interactive styles are needed on Web.
