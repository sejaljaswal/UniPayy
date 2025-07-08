# UniPlayy 🎮

A comprehensive gaming platform that connects university students through clubs, games, and real-time chat. UniPlayy provides both user and organizer interfaces for managing gaming communities and events.

## 🌟 Features

### For Users
- **User Authentication**: Secure signup and login system
- **Gaming Dashboard**: Browse and join various games
- **Club System**: Join university clubs and participate in discussions
- **Real-time Chat**: Live messaging in games and club chats
- **Leaderboards**: Track performance and compete with other players
- **User Profiles**: Manage personal information and gaming stats
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Organizers
- **Organizer Authentication**: Separate login system for event organizers
- **Club Management**: Create and manage university clubs
- **Event Organization**: Plan and host gaming events
- **Club Chat Management**: Moderate club discussions
- **Dashboard Analytics**: Track club engagement and member activity

## 🚀 Live Demo

- **Frontend**: [https://uniplayy.netlify.app/](https://uniplayy.netlify.app/)
- **Backend API**: [https://unipayy-backend.onrender.com](https://unipayy-backend.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **React Toastify** - User notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
UniPlayy/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── clubs/       # Club-related components
│   │   │   ├── dashboard/   # Dashboard components
│   │   │   ├── games/       # Gaming components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── leaderboard/ # Leaderboard components
│   │   │   ├── organizer/   # Organizer components
│   │   │   └── profile/     # Profile components
│   │   ├── contexts/        # React contexts
│   │   └── data/           # Mock data and utilities
│   └── public/             # Static assets
└── backend/                # Node.js backend application
    ├── controllers/        # Route controllers
    ├── middleware/         # Custom middleware
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── uploads/           # File uploads
    └── utils/             # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UniPlayy
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5555
   FRONTEND_URLS=http://localhost:5173,http://localhost:5174
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Create environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5555
   ```

7. **Start the frontend development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5555

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/organizer/signup` - Organizer registration
- `POST /api/organizer/login` - Organizer login

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get specific game
- `POST /api/games/:id/join` - Join a game

### Clubs
- `GET /api/clubs` - Get all clubs
- `POST /api/clubs` - Create a club
- `GET /api/clubs/:id` - Get specific club
- `POST /api/clubs/:id/join` - Join a club

### Messages
- `GET /api/messages/:gameId` - Get game messages
- `POST /api/messages` - Send a message

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard data

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Real-time Features
The application uses Socket.io for real-time features:
- Live chat in games
- Club chat messaging
- Real-time notifications
- Live updates for leaderboards

## 🚀 Deployment

### Frontend (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Sejal Jaswal** - *Full Stack Developer* - [YourGitHub](https://github.com/sejaljaswal)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Socket.io for real-time capabilities
- MongoDB for the flexible database solution

---

⭐ If you found this project helpful, please give it a star! 