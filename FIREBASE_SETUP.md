# Firebase setup — Step by step (India)

Follow these steps to use Firebase instead of Supabase for your temple website.

---

## Step 1: Create a Firebase project

1. Go to **[Firebase Console](https://console.firebase.google.com)** and sign in with your Google account.
2. Click **“Create a project”** (or “Add project”).
3. Enter project name, e.g. **`ss-temple`** or **`shree-samrajya-lakshmi`**.
4. (Optional) Turn on **Google Analytics** if you want; you can skip it.
5. Click **“Create project”** and wait until it’s ready, then **“Continue”**.

---

## Step 2: Register your app (Web)

1. On the project **Overview** page, click the **Web** icon `</>`.
2. Enter **App nickname**, e.g. **Temple Website**.
3. If you use hosting later, you can add a domain; for now leave **“Firebase Hosting”** unchecked.
4. Click **“Register app”**.
5. You’ll see a **config** object like this (you’ll need it in Step 7):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

6. Click **“Continue”** and then **“Continue to console”**.

---

## Step 3: Enable Authentication

1. In the left sidebar, go to **Build → Authentication**.
2. Click **“Get started”**.
3. Open the **“Sign-in method”** tab.
4. Enable:
   - **Email/Password** — turn on **Enable**, then **Save**.
   - **Phone** — turn on **Enable**, add your test phone (optional), **Save** (for OTP login later if you want).
5. (Optional) Under **Settings → Authorized domains**, add your custom domain when you have one; `localhost` is already allowed for development.

---

## Step 4: Create Firestore Database

1. In the left sidebar, go to **Build → Firestore Database**.
2. Click **“Create database”**.
3. Choose **“Start in test mode”** for now (we’ll add proper rules in Step 6). Click **Next**.
4. Pick a **location** (e.g. **asia-south1 (Mumbai)** for India). Click **Enable**.
5. Wait until the database is created.

---

## Step 5: Create Storage bucket (for files)

1. In the left sidebar, go to **Build → Storage**.
2. Click **“Get started”**.
3. Use default rules for now (test mode). Click **Next**.
4. Choose the same location as Firestore (e.g. **asia-south1**). Click **Done**.

---

## Step 6: Set Firestore Security Rules

1. Go to **Firestore Database → Rules**.
2. Replace the default rules with the content from the file **`firestore.rules`** in this project (see below), then click **“Publish”**.

This will:
- Let only signed-in users read/write their own `members` document.
- Let anyone read public data (events, puja types, approved testimonials).
- Let anyone create bookings, donations, registrations (for guest forms).
- Restrict admin-only collections (you can tighten later with custom claims).

---

## Step 7: Add Firebase to your React app

1. Install Firebase in your project:

```bash
npm install firebase
```

2. Create a file **`src/firebase.js`** (or `src/firebase/config.js`) and paste your config from Step 2:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
```

3. Replace `YOUR_API_KEY`, `YOUR_PROJECT`, etc. with the values from the Firebase Console (Step 2).

---

## Step 8: Firestore collections to create (structure)

You don’t have to create them manually; they are created when your app writes the first document. Use these names and fields so your app and rules match:

| Collection | Main use |
|------------|----------|
| `members` | One document per user: doc id = Firebase Auth UID. Fields: `memberId`, `fullName`, `mobile`, `email`, `city`, `state`, `dob`, `gotra`, `nakshatra`, `address`, `memberSince`, `isVolunteer`, `volunteerStatus`. |
| `familyMembers` | Subcollection under `members/{userId}`. Fields: `name`, `relation`. |
| `adminRoles` | One doc per admin: doc id = Auth UID. Fields: `role` ("super" or "manager"), `displayName`. |
| `pujaTypes` | Catalog. Fields: `name`, `priceCents`, `durationMins`, `description`, `isActive`. |
| `pujaBookings` | Fields: `memberId` (nullable), `guestName`, `guestPhone`, `guestEmail`, `guestGotra`, `guestNakshatra`, `pujaTypeId`, `bookingDate`, `timeSlot`, `sankalpa`, `gotra`, `nakshatra`, `status`, `completionProofUrl`, `completedAt`, `createdAt`, `updatedAt`. |
| `pujaBookingFamily` | Subcollection under `pujaBookings/{bookingId}`. Fields: `name`, `relation`. |
| `donationCauses` | Fields: `name`, `description`, `isActive`. |
| `donations` | Fields: `memberId`, `guestName`, `guestPhone`, `guestEmail`, `guestPan`, `amountCents`, `causeId`, `causeName`, `receiptUrl`, `eightyG`, `createdAt`. |
| `events` | Fields: `title`, `description`, `eventDate`, `eventType`, `maxParticipants`, `isPublished`, `createdAt`, `updatedAt`. |
| `eventRegistrations` | Fields: `eventId`, `memberId`, `guestName`, `guestPhone`, `guestEmail`, `ticketsCount`, `attended`, `registeredAt`. |
| `eventMedia` | Subcollection under `events/{eventId}`. Fields: `fileUrl`, `fileType`, `caption`, `uploadedBy`, `createdAt`. |
| `storeProducts` | Fields: `name`, `slug`, `priceCents`, `category`, `description`, `stock`, `imageUrl`, `isActive`, `createdAt`, `updatedAt`. |
| `storeOrders` | Fields: `orderNumber`, `memberId`, `customerName`, `customerPhone`, `customerEmail`, `shippingAddress`, `totalCents`, `status`, `createdAt`, `updatedAt`. |
| `storeOrderItems` | Subcollection under `storeOrders/{orderId}`. Fields: `productId`, `quantity`, `priceCents`. |
| `volunteerApplications` | Fields: `memberId`, `fullName`, `mobile`, `email`, `city`, `state`, `education`, `skills`, `preferredSeva`, `availability`, `additionalInfo`, `status`, `reviewedAt`, `reviewedBy`, `createdAt`, `updatedAt`. |
| `volunteerAssignments` | Subcollection under `volunteerApplications/{applicationId}`. Fields: `sevaArea`, `notes`, `assignedAt`, `assignedBy`. |
| `testimonials` | Fields: `memberId`, `authorName`, `authorLocation`, `content`, `status`, `reviewedAt`, `reviewedBy`, `createdAt`, `updatedAt`. |
| `mediaUploads` | Fields: `type` ("gallery" | "audio"), `title`, `fileUrl`, `durationSeconds`, `eventId`, `uploadedBy`, `uploaderType`, `status`, `reviewedAt`, `reviewedBy`, `createdAt`, `updatedAt`. |
| `notifications` | Fields: `title`, `message`, `audience`, `eventId`, `sentAt`, `createdBy`, `createdAt`. |

---

## Step 9: (Optional) Seed initial data

In Firebase Console → Firestore → **Start collection**:

1. Collection ID: **`pujaTypes`** → Add document (auto-ID) with fields: `name` (string) "Samrajya Lakshmi Puja", `priceCents` (number) 110000, `durationMins` (number) 90, `isActive` (boolean) true. Add more documents for other pujas.
2. Collection ID: **`donationCauses`** → Add documents with field `name`: "General Temple Fund", "Temple Construction", "Anna Danam", etc.

---

## Step 10: Run your app

```bash
npm run dev
```

Use **Login** and **Register**; they will use Firebase Auth. When you’re ready, we can wire your React app to read/write Firestore (members, bookings, donations, etc.) using the `db` and `auth` from `src/lib/firebase.js`.

---

## Firebase Admin SDK (server-side only)

The **Admin SDK** runs only on a **Node.js server** (e.g. Express, Cloud Functions). Never use it in the browser or commit your service account key.

- Get the key: Firebase Console → Project settings → Service accounts → Generate new private key. Save as `serviceAccountKey.json`.
- Put the key in a folder that is **gitignored** (e.g. `server/keys/` or `functions/keys/`). Add `serviceAccountKey.json` and `keys/` to `.gitignore`.

Example (Node.js backend):

```js
const admin = require("firebase-admin");
const serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sstemple-be2a6-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();
// Use db and auth for admin-only operations (e.g. verify tokens, create custom tokens, bypass rules).
```

See `server/firebase-admin.example.js` in this project for a copy-paste template.

---

## Summary checklist

- [ ] Create Firebase project  
- [ ] Register Web app and copy config  
- [ ] Enable Email/Password (and Phone if needed)  
- [ ] Create Firestore (test mode first, then update rules)  
- [ ] Create Storage bucket  
- [ ] Publish Firestore rules from `firestore.rules`  
- [ ] Add `src/lib/firebase.js` with your config and export `auth`, `db`, `storage`  
- [ ] (Optional) Seed `pujaTypes` and `donationCauses`  
- [ ] Run app and test Auth  

After this, we can connect your existing React pages (booking, donations, events, admin) to these Firestore collections and Storage.
