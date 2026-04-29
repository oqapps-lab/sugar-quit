# Bug Fixes Review From Screenshots

Date: 2026-04-29
Source: `bug-screenshots/` and `bug-screenshots/short-description.txt`

## Notes

- Screenshots are available for items: 1-37, 39-45, 47.
- Screenshots are missing for items: 38, 46, 48. These items are described from the text notes only.
- The numbering below is kept the same as in the original screenshots and notes.

## Fix List

### 1. Welcome screen headline typography

- Screenshot: `bug-screenshots/1.jpg`
- Problem: The headline is clipped by its container. The letter `g` is cut off.
- Fix: Adjust the font size, line-height, max width, and height so the headline fits without clipping.

### 2. Step indicator readability

- Screenshot: `bug-screenshots/2.jpg`
- Problem: The text `STEP 1 OF 15 - ~3 MIN` is too small, too faint, and too widely spaced.
- Fix: Make the text readable. Remove the `~` and the middle separator.

### 3. Back button alignment

- Screenshot: `bug-screenshots/3.jpg`
- Problem: The arrow inside the round button does not look centered. The button itself is too faint and looks unfinished.
- Fix: Center the icon inside a stable touch area, make the button background and size consistent across all onboarding screens, and replace the icon with a more suitable one.

### 4. Goal selection screen title

- Screenshot: `bug-screenshots/4.jpg`
- Problem: The title `What's the shape of your goal?` is too large for the screen width and wraps or clips awkwardly. As in item 1, the letter `g` is clipped.
- Fix: Add responsive title sizing, normal line-height, and safe horizontal padding so the text fits on Android screens.

### 5. Choice card design

- Screenshot: `bug-screenshots/5.jpg`
- Problem: Extra rectangular blocks are visible behind the text inside the cards. Because of this, the cards look broken or nested.
- Fix: Remove the inner rectangles and keep one clean card surface with consistent padding, radius, shadow, and text alignment.

### 6. Selected card state

- Screenshot: `bug-screenshots/6.jpg`
- Problem: The selected state looks too harsh: red fill, strong border, and an inner text background create visual noise.
- Fix: Make the selected state softer: use a light fill, clean border, clear selection indicator, and no inner background artifacts.

### 7. Multi-option selection states

- Screenshot: `bug-screenshots/7.jpg`
- Problem: Several options look selected even though the radio circles are empty. One option looks disabled without a clear reason.
- Fix: Make the selection model unambiguous. Only the selected item should use the selected style, the radio state must match the card state, and disabled styling should only be used when the option is actually unavailable.

### 8. Checkmark icon

- Screenshot: `bug-screenshots/8.jpg`
- Problem: The checkmark is not centered and sits on a visible square artifact.
- Fix: Replace it with a clean vector icon, center it inside the circle, and remove the opaque background.

### 9. Unclear preselected option

- Screenshot: `bug-screenshots/9.jpg`
- Problem: On step 4, an option looks selected immediately, but the two card states are styled inconsistently.
- Fix: If a default selection is needed, show it consistently. If the user should choose manually, start with no selected option and enable Continue only after a choice is made.

### 10. Heart shape

- Screenshot: `bug-screenshots/10.jpg`
- Problem: The heart icon is distorted and looks like a broken custom shape.
- Fix: Replace it with a correct heart icon and align it with the app's shared icon style.

### 11. Time selection does not work

- Screenshot: `bug-screenshots/11.jpg`
- Problem: The `Typical time` card shows `Tap to adjust`, but tapping it does nothing.
- Fix: Open a time picker or time adjustment control, save the selected value, and show the result to the user.

### 12. Trigger button borders

- Screenshot: `bug-screenshots/12.jpg`
- Problem: The buttons have borders that are too sharp and dark, which does not match the app's softer style.
- Fix: Soften the border color, radius, and selected/unselected states while keeping the buttons clear and tappable.

### 13. Work environment selection design

- Screenshot: `bug-screenshots/13.jpg`
- Problem: The buttons look like a draft: primitive shapes instead of clear icons, inner background blocks, inconsistent states, and weak alignment.
- Fix: Replace the shapes with meaningful icons, remove the inner blocks, align icons and labels, and make selected/unselected states consistent.

### 14. Safe area and Skip alignment

- Screenshot: `bug-screenshots/14.jpg`
- Problem: The row with back, step, and `Skip` is not aligned.
- Fix: Rebuild the onboarding header with safe-area handling: the back button, step indicator, and `Skip` must be evenly aligned, with no clipping or overlap. Center the icon inside the circle.

### 15. Input cursor color

- Screenshot: `bug-screenshots/15.jpg`
- Problem: The cursor is bright green/teal and does not match the app palette.
- Fix: Set the cursor and selection color to the app's branded accent color.

### 16. Result screen header alignment

- Screenshot: `bug-screenshots/16.jpg`
- Problem: The red brand dot is not aligned with `Sugar Quit`.
- Fix: Align the dot to the text baseline.

### 17. Paywall close icon position

- Screenshot: `bug-screenshots/17.jpg`
- Problem: The close `x` is not centered inside the circle.
- Fix: Place the close button in a fixed accessible position at the top right with a normal touch area.

### 18. Paywall benefit icons

- Screenshot: `bug-screenshots/18.jpg`
- Problem: The benefit icons are abstract and unclear.
- Fix: Replace them with clear and consistent icons for SOS, the 90-day program, trigger prediction, and streak freeze.

### 19. Paywall bottom overlap

- Screenshot: `bug-screenshots/19.jpg`
- Problem: The CTA button overlaps the price cards, timeline text, and `Maybe later`. The bottom part of the paywall becomes unreadable.
- Fix: Rebuild the bottom part of the paywall so the CTA, price cards, timeline, and secondary action do not overlap. Add bottom safe-area padding and test on small Android screens.

### 20. Jittery floating animation

- Screenshot: `bug-screenshots/20.jpg`
- Problem: The decorative/floating animation jumps instead of moving smoothly and is clipped near the top-right edge.
- Fix: Adjust easing/timing, keep the element inside the safe area, and remove abrupt animation resets.

### 21. Jittery auth/onboarding animation

- Screenshot: `bug-screenshots/21.jpg`
- Problem: The same animation issue is visible at the bottom of the auth/onboarding screen. The legal text is too low and hard to read.
- Fix: Apply the shared animation fix and make sure the legal text is readable, aligned, and not outside the safe area.

### 22. Terms and Privacy links

- Screenshot: `bug-screenshots/22.jpg`
- Problem: The `Terms` and `Privacy` links do not work.
- Fix: Make both links tappable and open the correct content, preferably inside the app through an in-app webview or modal. Show a clear message if loading fails.

### 23. Bottom navigation icons

- Screenshot: `bug-screenshots/23.jpg`
- Problem: The bottom navigation icons are too small and unclear. The active area is too transparent, so content shows through the navigation bar.
- Fix: Use clear icons, improve contrast, align icons and labels, and make the nav background solid enough.

### 24. SOS button animation

- Screenshot: `bug-screenshots/24.jpg`
- Problem: The SOS button animation looks rough.
- Fix: Reserve space for the SOS button and smooth the pulse/ring animation.

### 25. Forecast card badge alignment

- Screenshot: `bug-screenshots/25.jpg`
- Problem: The number `1` is not centered inside the circle. The card also has an inner rectangular background behind the content.
- Fix: Center the badge text precisely and remove the inner rectangle so the card is clean.

### 26. Locked card clarity

- Screenshot: `bug-screenshots/26.jpg`
- Problem: The locked card is too faint, and the lock icon looks like an emoji that does not belong in the interface.
- Fix: Improve disabled-state contrast, replace the lock with an icon from the shared icon system, and make the locked content state clear.

### 27. Curriculum cards

- Screenshot: `bug-screenshots/27.jpg`
- Problem: The cards have heavy or unclear borders and visible inner white rectangles behind the text. Day circles and text blocks are poorly integrated.
- Fix: Keep one clean card layer, use soft borders/shadows, and align the day circle, title, and metadata.

### 28. Progress/Journey animation smoothness

- Screenshot: `bug-screenshots/28.jpg`
- Problem: On the Progress/Journey screen, the animation or transition interrupts and does not feel smooth.
- Fix: Optimize the animation/transition, use native-driven or Reanimated animations where needed, and remove layout operations that cause frame drops.

### 29. SOS chat input with the keyboard open

- Screenshot: `bug-screenshots/29.jpg`
- Problem: When the keyboard opens, the input field does not move up correctly and is hard to see or use.
- Fix: Add correct keyboard avoidance and safe-area handling so the input and send button always stay above the keyboard.

### 30. Send button alignment

- Screenshot: `bug-screenshots/30.jpg`
- Problem: The send arrow is not centered inside the round button/capsule.
- Fix: Center the icon, keep the send button at a fixed size, and align it vertically with the input field.

### 31. Back navigation in SOS chat

- Screenshot: `bug-screenshots/31.jpg`
- Problem: The back button does not work, and it is unclear how to leave the SOS chat. The `End` label also does not work.
- Fix: The back button should return to the previous screen. Also add a clear and reliable flow for closing or ending the SOS chat.

### 32. End button

- Screenshot: `bug-screenshots/32.jpg`
- Problem: `End` looks like plain text inside a decorative shape and is not perceived as a button. Tapping it is also unreliable.
- Fix: Turn `End` into a real button with a clear hit area and handler. Preferably add confirmation before ending the SOS session.

### 33. Icons and text in the stats card

- Screenshot: `bug-screenshots/33.jpg`
- Problem: The metric icons are unclear, and the text `~25g/day baseline` looks strange.
- Fix: Replace the icons with clear metric icons and rewrite the avoided sugar note in normal language.

### 34. Profile menu icons and arrows

- Screenshot: `bug-screenshots/34.jpg`
- Problem: The icons and right-side arrows are too small, inconsistent, and unclear.
- Fix: Use one icon set, align icons, labels, and chevrons, and make each row clearly tappable.

### 35. Sign-in validation

- Screenshot: `bug-screenshots/35.jpg`
- Problem: The validation error is shown only as red text and is weakly connected to the specific field.
- Fix: Add field-level validation: highlight the email field border, place the message near the field, and match the button state to form validity. Review and fix validation across the login and registration forms.

### 36. Sign-up validation and technical error

- Screenshot: `bug-screenshots/36.jpg`
- Problem: The user sees a technical Supabase config error. Invalid email input is not highlighted clearly.
- Fix: Replace technical errors with clear user-facing messages, add field-level validation, and do not expose environment variable names to the user.

### 37. Privacy Policy

- Screenshot: `bug-screenshots/37.jpg`
- Problem: Privacy Policy opens in an external browser and leads to an unavailable page.
- Fix: Add a working Privacy Policy and open it inside the app or an in-app webview instead of using a broken external browser flow.

### 38. Support should be inside the app

- Screenshot: missing.
- Problem: In Profile, pressing `Support` opens Gmail. Help and support should not depend on an external email app.
- Fix: Implement an in-app support form. Submit the request to a backend/email pipeline and show success/error states. Keep `mailto` only as a fallback option.

### 39. Layout shift when OFF is pressed

- Screenshot: `bug-screenshots/39.jpg`
- Problem: When `OFF` is pressed, the row/block moves. This shift should not happen.
- Fix: Lock the toggle dimensions and keep the row layout stable for both ON and OFF states.

### 40. Toggle button design

- Screenshot: `bug-screenshots/40.jpg`
- Problem: The ON/OFF buttons look raw and do not fit the overall design.
- Fix: Redesign them as proper switches or segmented toggles with consistent size, padding, radius, typography, and states.

### 41. Paywall price clipping

- Screenshot: `bug-screenshots/41.jpg`
- Problem: The `$0.22 / day` line can be clipped by the container, especially near the word `day`.
- Fix: Make the price row responsive: adjust font size, line-height, max width, and right padding so the price always fits.

### 42. Paywall benefit icons

- Screenshot: `bug-screenshots/42.jpg`
- Problem: The benefit icons are inconsistent, unclear, and not aligned. One of them looks like an emoji snowflake.
- Fix: Replace all benefit icons with one vector icon set and align them with the text.

### 43. Change photo

- Screenshot: `bug-screenshots/43.jpg`
- Problem: `Change photo` does not work.
- Fix: Connect an image picker or avatar selector, handle permissions, save the selected avatar, and show a fallback if the feature is unavailable.

### 44. Edit profile and Save

- Screenshot: `bug-screenshots/44.jpg`
- Problem: Edit profile fields show `-` and do not look editable. `Save` does not work or does not show a visible result.
- Fix: Make Goal, Peak Hour, and Main Trigger editable/selectable, validate the values, save changes, and show success or error feedback.

### 45. Journey header alignment

- Screenshot: `bug-screenshots/45.jpg`
- Problem: Header elements are not aligned.
- Fix: Use a shared header layout with vertical centering, safe-area spacing, and predictable left/center/right slots.

### 46. Global back button behavior

- Screenshot: missing.
- Problem: In some tabs, the back button always sends the user to Home, although it should often return to the previous step.
- Fix: Audit back navigation across the app. Use history-based back where needed, and keep Home navigation only for explicit home actions or fallback states.

### 47. Milestone/timeline icons and alignment

- Screenshot: `bug-screenshots/47.jpg`
- Problem: Milestone icons are unclear, labels are hard to read, and active/inactive states are not clearly aligned or distinguishable enough.
- Fix: Replace milestone icons with clear symbols, align icons and labels evenly, and increase the contrast between active and inactive states.

### 48. Intermittent app crashes

- Screenshot: missing.
- Problem: The app sometimes crashes unexpectedly.
- Fix: Review crash logs and all main flows: onboarding, auth, paywall, SOS, and profile. Add guards for null/async states and an error boundary or graceful fallback so the app does not close unexpectedly.
