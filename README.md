# Inkle Assignment — Frontend

A frontend assignment built using **React + Vite** as part of Inkle’s interview task.The project includes a dynamic table using **@tanstack/react-table**, an edit modal, API integration, and a country selector.

---

## 🚀 Live Demo

🔗 **Project URL:**  
https://inkle-assignment-frontend-app.netlify.app/

---

## 🎞 GIF Demo Preview

![App Demo GIF](https://raw.githubusercontent.com/Sandeepna2/inkle-assignment-frontend-app/main/inkle_demo.gif)

---

## 🎥 Full Demo Video

[🎬 Click here to watch the full demo](https://raw.githubusercontent.com/Sandeepna2/inkle-assignment-frontend-app/main/inkle_recording.webm)

---

## 📌 Features

### ✔️ Fetch & Display Data
- Loads tax data from MockAPI  
- Uses **@tanstack/react-table** for a modern, flexible table UI  

### ✔️ Edit Modal
- Edit **Name** and **Country**  
- Country list fetched dynamically from API  
- Modal shows pre-filled row values  

### ✔️ Update API (PUT Request)
- Merges updated fields with existing record  
- Sends PUT request to the backend  
- UI refreshes after update  

### ✔️ Pixel-Perfect UI
- Matches the provided Figma design  
- Responsive layout  
- Smooth modal UX  

---

## 🛠️ Tech Stack

- **React + Vite**  
- **@tanstack/react-table**  
- **CSS**  
- **Axios**  
- **MockAPI**  
- **React Hooks**  

---


## 📂 Folder Structure
inkle-assignment-frontend-app/
│── public/
│── src/
│   ├── components/
│   │   ├── Table.jsx
│   │   ├── EditModal.jsx
│   ├── services/
│   │   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│── package.json
│── README.md

## 🔗 API Endpoints
### ➤ Get all tax records
GET https://685013d7e7c42cfd17974a33.mockapi.io/taxes

### ➤ Get all countries
GET https://685013d7e7c42cfd17974a33.mockapi.io/countries

### ➤ Update a record
PUT https://685013d7e7c42cfd17974a33.mockapi.io/taxes/:id

### ✔️ Example Payload
{
  "name": "Ravi",
  "country": "India"
}

## 🧩 How Editing Works
- User clicks Edit on a row
- Modal opens with existing values
- Country list loads from API
- User edits data
- Clicking Save sends PUT request
- Table updates immediately

## 🚀 Installation & Setup
git clone https://github.com/Sandeepna2/inkle-assignment-frontend-app.git
cd inkle-assignment-frontend-app
npm install
npm run dev

Open the app at:
http://localhost:5173
