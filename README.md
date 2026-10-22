# CarePass

CarePass is a prototype for a clear medication-safety handoff. Patients record health conditions, allergies, and current medicines, then preview a concise clinician-facing summary with details to confirm.

## Run the app

Install Node.js and npm, then from the project folder run:

```sh
npm install
npm run dev
```

Open the local address printed by Vite (normally `http://127.0.0.1:5173`). The fictional preview can also be opened directly from `index.html`, but TideCloak sign-in requires running through Vite and adding your own adapter config. See [TIDECLOAK.md](./TIDECLOAK.md).

## Connect your own TideCloak realm

1. Set up a TideCloak realm and register a web client for `http://127.0.0.1:5173`.
2. Create the realm roles `carepass.patient` and `carepass.doctor`, then assign exactly one role to each test account.
3. Download the Tide adapter configuration for the app as `tidecloak.json` and place it beside `package.json`. This local file is ignored by Git; do not upload it.
4. Run the app and choose **Sign in**. More details and known limits are in [TIDECLOAK.md](./TIDECLOAK.md).

Each friend needs to configure their own TideCloak realm, web client, roles, and `tidecloak.json`. The repository does not contain a shared realm or credentials.

## Current prototype flow

1. Search common terms such as “heart” or “kidney” and select a specific condition, or record that the diagnosis is uncertain.
2. Add allergy details, including the reported reaction and severity. “No known allergies” and “Not sure” are separate choices.
3. Add current medicines and an optional eGFR result/date.
4. Choose **Preview clinician view** to see a patient-reported summary and review prompts.
5. Enter a medicine name to see a demo exact-text allergy match. This does not identify related ingredients, interactions, or clinical contraindications.

All profile entries are fictional and held in page memory only. Reloading resets the demo. Do not enter real patient information. The reminders are not medical advice, and the prototype is not a medication decision-support system.

## Preserved demo and integration work

The earlier synthetic access-request demo is preserved in [challenge2-share-demo.html](./challenge2-share-demo.html). A static preview snapshot is also available in `CarePass-public-site.zip`; that archive is for preview only. The main app and TideCloak integration are at the project root and in [src/tide-integration.js](./src/tide-integration.js).

TideCloak sign-in and role routing only gate the demo views. There is no backend API or database validating requests, so this prototype must not be used with real patient records. See [TIDECLOAK.md](./TIDECLOAK.md) for security and integration limits.
