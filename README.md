# 🎯 SayIt - Anonymous Message Board

A modern, anonymous message board where anyone can post short messages that appear on the homepage. Built with Node.js, Express, React, and MongoDB.

## ✨ Features

- **Anonymous Posting**: No login or personal data required
- **AI-Powered Moderation**: Multi-language profanity filtering using OpenAI
- **Real-time Feed**: Instant message updates with smooth animations
- **Dark/Light Mode**: Beautiful theme switching
- **Responsive Design**: Works perfectly on mobile and desktop
- **Character Validation**: 150 character limit with live counter
- **Random Card Colors**: Each message gets a unique color
- **Clean Suggestions**: AI suggests clean versions for rejected messages

## 🎨 Color Palette

### Dark Mode
- Background: `#0A0A0A` (Deep Black)
- Card Background: `#18181B` (Charcoal)
- Primary Accent: `#FF2E88` (Neon Pink)
- Secondary Accent: `#FF6FB5` (Soft Magenta)

### Light Mode
- Background: `#FFFFFF` (White)
- Card Background: `#FFEAF4` (Soft Pink Tint)
- Primary Accent: `#FF2E88` (Hot Pink)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API key

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd SayIt
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongo_uri
# Or for MongoDB Atlas:
# MONGODB_URI=your_uri

FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
sayit/
├── backend/
│   ├── server.js                 # Express server configuration
│   ├── models/
│   │   └── Message.js            # MongoDB message schema
│   ├── routes/
│   │   └── messages.js           # API routes for messages
│   ├── middleware/
│   │   └── profanityFilter.js    # OpenAI profanity detection
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app with routing & theme
│   │   ├── components/
│   │   │   ├── MessageForm.jsx   # Message submission form
│   │   │   ├── MessageFeed.jsx   # Message list container
│   │   │   ├── MessageCard.jsx   # Individual message card
│   │   │   └── Footer.jsx        # Site footer
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Home page
│   │   │   └── TermsAndConditions.jsx
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # React entry point
│   ├── index.html
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── vite.config.js            # Vite configuration
│   └── package.json
│
└── README.md
```

## 🔧 API Endpoints

### GET `/api/messages`
Retrieve all messages (sorted by newest first, limited to 100)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "messages": [...]
}
```

### POST `/api/messages`
Create a new anonymous message

**Request Body:**
```json
{
  "content": "Your message here",
  "recipient": "Recipient name"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Message posted successfully!",
  "data": {
    "_id": "message_id",
    "content": "Your message here",
    "recipient": "Recipient name",
    "cardColor": "#FF2E88",
    "createdAt": "2025-10-27T01:23:45.678Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Your message contains inappropriate content",
  "reason": "Offensive language detected",
  "cleanVersion": "Your suggested clean message"
}
```

### DELETE `/api/messages/:id`
Delete a message (Admin only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

## 🌟 Features in Detail

### AI-Powered Moderation
- Uses OpenAI's API to detect and filter inappropriate content
- Supports multiple languages
- Suggests clean alternatives for rejected messages
- Prevents spam and abuse while maintaining privacy

### Modern UI/UX
- Smooth animations and transitions
- Responsive design for all devices
- Dark/Light mode with system preference detection
- Interactive message cards with random colors

### Performance Optimized
- Efficient database queries with indexing
- Client-side form validation
- Optimized bundle sizes with Vite
- Lazy loading for better initial load performance

## 🛠️ Tech Stack

### Frontend
- React 18 with Hooks
- Vite for fast development and builds
- TailwindCSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- OpenAI API for content moderation
- CORS and security middleware
- Environment-based configuration

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by anonymous message boards and confessions platforms
- Uses Lucide icons and TailwindCSS for beautiful UI components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

For any questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by Yugank