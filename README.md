# 💸 ExpenseManager — Track, Split & Simplify Shared Expenses

Welcome to **ExpenseManager** — the all-in-one expense tracker designed for friends, roommates, travel groups, and teams. Whether it's a Goa trip or monthly rent sharing, ExpenseManager keeps everyone in sync.

---

## ✨ Key Features

### 👥 **User Management**

- 🔐 Secure sign-in with **Firebase OTP authentication**
- 📱 One account per phone number (Firebase UID-based)
- ✉️ Optional email support

### 💰 **Expense Tracking**

- ➕ Add one-time or recurring expenses
- 🏷️ Tag with one or multiple categories
- 🧾 Attach receipts, bills, or images
- 🕒 Choose past or future dates with time accuracy (UTC-based)

### 👨‍👩‍👧‍👦 **Group Activities**

- 🌍 Create group activities like _"Manali Trip"_, _"Flatmates 2024"_
- 👬 Invite members to share and split expenses
- 💬 Group chat support with threaded messages

### 🧮 **Smart Splitting Engine**

- ⚖️ Supports multiple split types (equal, percentage, custom)
- 🔄 Manual adjustments with full history logs
- ✅ Real-time tracking of pending and settled amounts

### 💬 **Comments & Notes**

- 💭 Add threaded comments on each expense
- 🖊️ Mark as edited or deleted (soft delete support)

### 📊 **Analytics & Reports**

- 📅 Monthly and daily breakdowns
- 📈 Category-wise insights
- 🔄 Infinite scroll loading like Google Pay
- 💡 Smart summaries (Today, Yesterday, This Month, etc.)

### 🗃️ **Categories**

- 🗂️ Global system-defined categories (Food, Travel, etc.)
- ➕ User-defined custom categories

### 📁 **Audit Logging**

- 🔍 Track every change — what changed, who changed, and when
- 🛡️ Fully traceable for disputes or transparency

---

## 🧑‍💻 Developer Details

### ⚙️ Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL (with TypeORM)
- **Auth**: Firebase (Phone OTP)
- **API Docs**: Swagger (OpenAPI)

---

## 🚀 Getting Started (Local Setup)

### 🧾 Prerequisites

- Node.js (v18+)
- PostgreSQL
- Firebase Project (for Auth)
- `.env` file with DB and Firebase config

### 📦 Installation

```bash
git clone https://github.com/JobinMathewP/expense-manager
cd expense-manager
npm install
```

````

### ⚙️ Environment Config

Create a `.env` file in the root:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_NAME=ExpenseManager
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

### 🛠 Run the Project

```bash
npm run start:dev
```

Access Swagger API docs at:
👉 [`http://localhost:3000/api`](http://localhost:3000/api)

---

## 🏗 Roadmap

- 🔐 Role-based permissions
- 🧾 Monthly PDF exports
- 🔔 Notification system
- 📱 React Native frontend (planned)

---

Made with ❤️ for communities that hate splitting bills manually!

```

---

Would you like me to also:
- Add badges (build status, license, etc.)?
- Create `.env.example`?
- Or prepare a GitHub issue/PR template for open source contributions?

Let me know!
```
````
