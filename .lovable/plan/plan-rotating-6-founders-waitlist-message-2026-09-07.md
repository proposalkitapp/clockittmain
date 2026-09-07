# Plan: Rotating "6 founders" waitlist message

## Goal

Make the "6 founders are already on the waitlist" line under the signup form cycle through translations in different languages, changing every 10 seconds.

## Changes

1. **Add a translations list** — the same message in ~8 languages (English, Spanish, French, Portuguese, German, Italian). "6 founders" stays bold in each.
2. **Add a small rotating-text component** in `src/routes/index.tsx`:
  - A timer switches to the next language every 10 seconds.
  - A smooth fade/slide animation (Framer Motion, already in the project) so the text swaps gracefully instead of jumping.
  - Fixed minimum height on the text container so the layout doesn't shift when a longer language appears.
3. **Cleanup** — the timer stops when the component unmounts; no impact on the rest of the page.

## Notes

- Fully client-side, no backend changes, no new dependencies.
- Languages can easily be edited or extended later — just tell me which ones to add or remove.