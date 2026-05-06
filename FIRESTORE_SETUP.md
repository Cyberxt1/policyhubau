# Firestore Setup

The team pairing frontend is already linked to this Firestore document:

- Project: `auphub-ng`
- Document path: `appData/teamPairing`

The app reads and writes through the Firestore REST API from:

- [src/lib/teamPairing.ts](./src/lib/teamPairing.ts)

## Rules files

- `firestore.rules`
  Recommended production rules.
  Public reads are allowed for the published team page.
  Writes require a signed-in Firebase user with the custom claim `admin: true`.

- `firestore.temporary-open.rules`
  Temporary fallback rule if you want the current browser-only `/adminlog` page to write immediately without Firebase Auth.
  This is not secure because anyone can overwrite the team data.

## Important limitation

The current admin access check uses the username `oluokundavid4` only inside the frontend UI.
Firestore security rules cannot trust that browser-only check.

That means you have 2 choices:

1. Recommended: keep `firestore.rules` and add Firebase Authentication for the admin page.
2. Temporary: deploy `firestore.temporary-open.rules` so the current admin page can write right away.

## How to deploy rules

If you use the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

If you want to use the temporary open rules first, point `firebase.json` to `firestore.temporary-open.rules` and then deploy rules.

## What already works in the app

- Public users can fetch the published team pairing document from Firestore.
- Admin changes are saved to the same Firestore document path.
- Multiple team sets are stored, and one active set is published to `/team-pairing`.

## Next secure step

Add Firebase Auth to `/adminlog`, then keep `firestore.rules` as the production ruleset.
