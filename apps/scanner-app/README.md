# Scanner App (placeholder)

This directory captures the early bootstrap for the upcoming React Native scanner app.

## Status
- Placeholder runner: `pnpm --filter scanner-app dev` prints the current intent and notes that a proper React Native/Expo project is pending.
- Later work should add a real `expo` or `react-native` project (managed or bare) and wire the scanner-specific screens and native modules.

## Next steps
1. Decide between Expo or plain React Native + Turbo + pnpm.
2. Add a dedicated `App.tsx`, native entry points, and Metro configuration if needed.
3. Share tokens and validation logic from the web packages.
4. Wire device camera permissions, QR flows, and offline resilience.

For now, this placeholder keeps the workspace honest while the web apps and shared packages form the technical trunk.
