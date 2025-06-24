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

/api/neo

/api/nasa-search


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
/api/neo(Note: Press Fetch button to see the result)
/api/nasa-search(Note: Press Search button to see the result)

🚀 Deployment
Frontend: Vercel

Backend: Render or Railway

📸 Screenshots
Add screenshots of:

The EPIC carousel
![image](https://github.com/user-attachments/assets/eb8e65f8-eed4-4dac-98af-166310cd6062)

APOD
![image](https://github.com/user-attachments/assets/5a4ba622-1f21-46b0-b39e-ff45dc6699ba)

Mars photo viewer
![image](https://github.com/user-attachments/assets/e9dc6c79-520f-4d5c-a36b-6abbc13a7981)

NEO
![image](https://github.com/user-attachments/assets/bd1c52b2-91d5-402d-9227-514ce19cb49d)

Media Library
![image](https://github.com/user-attachments/assets/0b8d8bda-1c0b-4da3-8509-bd68119d05d0)



📜 License
MIT © Surendradura123
