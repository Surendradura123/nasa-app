NASA API Wep App 
🚀 NASA Space Explorer
Explore real-time space data using NASA's public APIs — including EPIC Earth imagery, Mars rover photos, NEO tracking, and the Astronomy Picture of the Day. Built with React, TailwindCSS, and Node.js.

🔗 Live Demo
🌍 View deployed app 
Vercel = https://nasa-app-tau-five.vercel.app/
Render = https://nasa-app-oeec.onrender.com

📁 Project Structure
nasa-app/
├── frontend/       # React + TailwindCSS UI
├── backend/        # Node.js + Express server
└── README.md


✨ Features
🔭 Frontend
React with TailwindCSS styling

Responsive navbar with route links:

Home (APOD)
Mars Rover photos with filters
EPIC Earth image viewer with date picker and carousel
Near-Earth Objects 
NASA media library search 

EPIC carousel with:

📅 date picker
🎞️ autoplay slideshow
⬇️ download buttons
📈 timeline chart of image frequency

Dark theme aesthetic using Tailwind

🛰️ Backend
Built with Express.js

Serves NASA API endpoints via:

/api/apod

/api/mars

/api/epic

Handles query params like ?sol=, ?camera=, ?date=

Secure API key usage with .env

🧪 Testing
Frontend unit tests with Jest + React Testing Library

Backend route tests using Jest + Supertest

🧰 Tech Stack
Frontend	Backend	Tools & APIs
React	Node.js	NASA Open API
React Router DOM	Express	Recharts (charts)
Tailwind CSS	CORS + dotenv	React Slick (carousel)
Axios/Fetch	Supertest (test)	

⚙️ Installation & Usage
📦 Clone the Repo

git clone https://github.com/Surendradura123/nasa-app.git
cd nasa-app
🖥️ Frontend Setup

cd frontend
npm install
npm start
This will run the React app on http://localhost:3000

🌐 Backend Setup

cd backend
npm install
touch .env
📄 .env file
env

NASA_API_KEY=your_nasa_api_key_here
PORT=5000

node index.js
Server runs on http://localhost:5000

✅ Example API Routes
Route	Description
/api/apod	Astronomy Picture of the Day
/api/mars	Mars rover images by sol/camera
/api/epic?date=	EPIC Earth imagery for a date

🚀 Deployment
Frontend: Vercel

Backend: Render or Railway

📸 Screenshots
Add screenshots of:

The EPIC carousel
![image](https://github.com/user-attachments/assets/5a4ba622-1f21-46b0-b39e-ff45dc6699ba)

Mars photo viewer

Timeline chart

Navbar and layout

🧠 Future Enhancements
 Add EPIC video/GIF export

 Full NEO and Media Library integrations

 User favorites or collections

 Offline cache with service workers

📜 License
MIT © Surendradura123
