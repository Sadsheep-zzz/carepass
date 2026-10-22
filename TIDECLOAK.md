# CarePass + TideCloak sign-in

CarePass uses Vite and the vanilla JavaScript TideCloak SDK. The sign-in button and role routing live in `src/tide-integration.js`. The linked GitHub quickstart creates a separate Next.js app; it is not needed for this Vite project.

## What is connected

- TideCloak sign-in and sign-out.
- Signed-in accounts with exactly one CarePass realm role are routed to the matching Patient or Doctor view.
- The view switcher is locked to that role while signed in.
- Without an adapter file, the fictional preview still works and sign-in reports that configuration is missing.

## Setup

1. In the CarePass folder, install the dependencies with `npm install`.
2. Start a TideCloak development realm. Tide's Quickstart uses Docker; alternatively use a TideCloak realm already available to you.
3. In TideCloak, register a web app client. This project's Vite script binds to `127.0.0.1:5173`, so allow `http://127.0.0.1:5173/*` as a redirect URI and `http://127.0.0.1:5173` as a web origin. The app has the required `public/auth/redirect.html` and `public/silent-check-sso.html` files.
4. In the Tide console, download the app's Tide adapter JSON as `tidecloak.json` and put it beside `package.json`. The repository ignores this local config file.
5. Create the realm roles `carepass.patient` and `carepass.doctor`. Assign each CarePass account exactly one of these roles. CarePass uses the role in the TideCloak account; clicking a view or changing browser state does not grant an account role.
6. Run `npm run dev` and open `http://127.0.0.1:5173`. Click **Sign in**. TideCloak should return the user to CarePass and open the view matching the assigned role. **Sign out** clears the app's role view.

## Current limits

The current health profile is fictional and held in browser memory. The role routing in this prototype is client-side UI behavior; there is no backend API or database validating requests. Do not use real patient information. A `carepass.doctor` role alone must not grant access to every patient's records. Before real data is added, implement backend token verification and patient-specific authorization. Patient-to-doctor grants, revocation, and encrypted cross-user sharing are not implemented by this sign-in connection.

## References

- [TideCloak JavaScript + Vite tutorial](https://docs.tide.org/Languages/JavaScript/tidecloak-js-tutorial)
- [TideCloak Getting Started repository](https://github.com/tide-foundation/tidecloak-gettingstarted)
