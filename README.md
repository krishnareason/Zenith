# 📈 TrackInTrade

An intelligent trading journal to track, analyze, and optimize your performance using a powerful dashboard and AI-powered insights.

---

## 🚀 Live Demo

*[Link to your deployed application will go here once it's live!]*

## 📸 Screenshot

![TrackInTrade Dashboard](path/to/your/screenshot.png)
*Replace this with a path to a good screenshot of your dashboard!*

## ✨ Features

- **Secure User Authentication:** Full registration and login system using JWT for secure, stateless sessions.
- **Interactive Data Dashboard:** A comprehensive overview of trading performance with KPI cards and four interactive charts (Monthly P&L, P&L by Day, P&L Over Time, and Profit by Strategy).
- **Full CRUD for Trades:** Easily Create, Read, Update, and Delete trades through a modern modal interface.
- **Cost Analysis:** Factor in commissions and fees to calculate and track true net profitability.
- **Dedicated Notes Section:** A full CRUD interface for creating and managing personal trading journal entries.
- **Goal Setting & Tracking:** Set, track, and manage specific trading goals to maintain discipline and motivation.
- **AI-Powered Insights:** A premium feature that uses the Google Gemini API to analyze trade data and provide personalized, actionable feedback.
- **Responsive Design:** A sleek, dark-themed UI that is fully responsive and works beautifully on desktop, tablets, and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React (Vite):** A modern, fast JavaScript library for building user interfaces.
- **React Router:** For client-side routing and navigation.
- **Axios:** For making HTTP requests to the backend API.
- **Recharts:** For creating beautiful, interactive charts.
- **CSS:** Custom styling for a responsive, dark-themed UI.

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for building the REST API.
- **PostgreSQL:** Powerful, open-source relational database.
- **pg (node-postgres):** PostgreSQL client for Node.js.
- **jsonwebtoken & bcryptjs:** For handling JWT authentication and password hashing.
- **@google/generative-ai:** Official SDK for the Google Gemini API.

### Database
- **Neon.tech:** Serverless PostgreSQL hosting platform.

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm
- A PostgreSQL database (you can get a free one from [Neon.tech](https://neon.tech/))
- A Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/))

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/TrackInTrade.git](https://github.com/your-username/TrackInTrade.git)
    cd TrackInTrade
    ```

2.  **Backend Setup:**
    ```sh
    # Navigate to the backend folder
    cd trackintrade-backend

    # Install NPM packages
    npm install

    # Create a .env file in the root of the backend folder
    # and add the following variables:
    ```
    ```env
    DATABASE_URL="your_postgresql_connection_string_from_neon"
    JWT_SECRET="your_super_secret_key_for_jwt"
    GEMINI_API_KEY="your_google_gemini_api_key"
    ```
    ```sh
    # Start the backend server
    npm start
    ```
    The backend will be running on `http://127.0.0.1:3000`.

3.  **Frontend Setup:**
    *Open a new, separate terminal.*
    ```sh
    # Navigate to the frontend folder from the root
    cd trackintrade-frontend

    # Install NPM packages
    npm install

    # Start the frontend development server
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

4.  Open your browser and navigate to `http://localhost:5173` to see the application.
