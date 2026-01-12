# Split-It

A modern web application for managing and splitting expenses within groups. Perfect for friends, flatmates, roommates, or any group that needs to track shared expenses and calculate who owes whom.

## 🌟 Features

- **User Authentication**: Secure signup and login using Firebase Authentication
- **Group Management**: Create and manage multiple expense groups
- **Transaction Tracking**: Add, edit, and delete expense transactions
- **Smart Expense Splitting**: Automatically split expenses among selected group members
- **Real-time Reports**: View detailed reports showing individual balances and who owes whom
- **Statistics Dashboard**: Track total spending, personal spending, and transaction counts
- **Member Management**: Add new members to existing groups
- **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices

## 🚀 Live Demo

Visit the live application at: [split-it.girhe.com](https://split-it.girhe.com)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Firebase
  - Firebase Authentication (Email/Password)
  - Cloud Firestore (Database)
  - Firebase Hosting
- **Icons & Assets**: Custom SVG icons and images

## 📁 Project Structure

```
NGCommonFund/
├── index.html          # Landing page
├── login.html          # User login page
├── signup.html         # User registration page
├── groupList.html      # Groups list and creation
├── groupview.html      # Individual group view with transactions
├── auth.js             # Authentication functions (login, signup, logout)
├── groupList.js        # Group list management logic
├── groupview.js        # Transaction management and reporting logic
├── firebase.json       # Firebase hosting configuration
├── CNAME               # Custom domain configuration
├── 404.html            # Custom 404 error page
└── assets/             # Static assets
    ├── bank.png
    ├── group.png
    ├── salary.png
    └── shopping-bag.png
```

## 🚀 Getting Started

### Prerequisites

- A Firebase project with:
  - Authentication enabled (Email/Password provider)
  - Cloud Firestore database
  - Firebase Hosting configured

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd NGCommonFund
   ```

2. **Set up Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Create a Cloud Firestore database
   - Get your Firebase configuration

3. **Configure Firebase**

   - Update the `firebaseConfig` object in the following files:
     - `login.html`
     - `signup.html`
     - `groupList.html`
     - `groupview.html`
   - Replace the placeholder configuration with your Firebase project credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };
     ```

4. **Deploy to Firebase Hosting**
   ```bash
   firebase login
   firebase init hosting
   firebase deploy
   ```

## 📖 How It Works

### User Flow

1. **Sign Up / Login**: Users create an account or log in with email and password
2. **Create Groups**: Users can create expense groups and add other users by email
3. **Add Transactions**: Within a group, users can add expenses with:
   - Amount
   - Description
   - Items/participants
   - Selected group members who share the expense
4. **View Reports**: The app automatically calculates:
   - Individual balances (positive = owed money, negative = owes money)
   - Settlement suggestions (who should pay whom)
5. **Manage Transactions**: Users can edit or delete their own transactions

### Database Structure

- **Users Collection** (`user`):

  - Document ID: User email
  - Fields: `name`, `group` (array of group IDs)

- **Groups Collection** (`group`):
  - Document ID: Auto-generated group ID
  - Fields: `name`, `list` (array of user emails), `report` (array of balances)
  - Subcollection: `transaction`
    - Fields: `name`, `list`, `price`, `description`, `userlist`, `date`

## 🎨 Features in Detail

### Expense Splitting Algorithm

The app uses a fair splitting algorithm:

- When a user adds an expense, they pay the full amount
- The expense is divided equally among selected participants
- The payer's balance increases (they're owed money)
- Other participants' balances decrease (they owe money)

### Report Generation

The app generates two types of reports:

1. **Individual Balances**: Shows each member's current balance
2. **Settlement Suggestions**: Calculates the minimum number of transactions needed to settle all debts

## 🔒 Security

- All authentication is handled by Firebase Authentication
- User data is stored securely in Cloud Firestore
- Only authenticated users can access groups
- Users can only edit/delete their own transactions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created by [Girhe](https://girhe.com/)

## 🙏 Acknowledgments

- Firebase for providing the backend infrastructure
- Tailwind CSS for the beautiful UI framework
- All contributors and users of Split-It

---

**Note**: Make sure to configure your Firebase project properly and update all configuration files before deploying to production.
