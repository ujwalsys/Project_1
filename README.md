**Client Management Application**
# 🗂️ **Client & Meeting Manager**

A modern, themeable **React app** for managing clients and meetings, with persistent storage using [json-server](https://github.com/typicode/json-server).
Supports **light/dark mode**, clean UI, and live data editing via REST API.

---

## 📦 **Features**

* ✅ Add, view, and list clients (name, email, address, password)
* 🗓️ Schedule and view meetings (topic, number of people, date, time)
* 💾 Data persistence via `db.json` and `json-server`
* 🎨 Modern, responsive UI with **light/dark mode** toggle

---

## 🚀 **Getting Started**

### 🔧 **1. Clone the Repository**

```bash
git clone <your-repo-url>
cd <project-directory>
```

### 📦 **2. Install Dependencies**

```bash
npm install
```

### 🗃️ **3. Set Up `db.json` for json-server**

Create a `db.json` file in your project root:

```json
{
  "clients": [],
  "meetings": []
}
```

### 🔌 **4. Start the Mock REST API**

```bash
npx json-server --watch db.json --port 3001
```

* 📍 API available at: [http://localhost:3001](http://localhost:3001)
* 🔗 Endpoints: `/clients`, `/meetings`
* 💾 All changes via the app are saved to `db.json` live.

### 🧭 **5. Start the React App**

```bash
npm run dev
```

*or, if using Create React App (CRA):*

```bash
npm start
```

* 🖥️ App will open at:

  * [http://localhost:5173](http://localhost:5173) (Vite)
  * [http://localhost:3000](http://localhost:3000) (CRA)

---

## 🖥️ **Usage**

### ➕ **Add Clients**

* Fill out the client form (name, email, address, password, repeat password)
* Click **Create**
* The new client is listed and saved in `db.json`

### 📅 **Schedule Meetings**

* Fill out the meeting form (topic, number of people, date, start time)
* Click **Schedule**
* The meeting is added to the list and saved in `db.json`

### 🌗 **Toggle Theme**

* Click the 🌞/🌙 button to switch between light and dark mode
* All components instantly adapt

### 💽 **Data Persistence**

* All changes are written to `db.json`
* Your data survives reloads and restarts

---

## 🛠️ **Project Structure**

```
/src
  App.jsx         # Main React component
  app.css         # Light/Dark mode styling
  ...
db.json           # Local JSON database
README.md         # This file
```

---

## 📝 **Commands Reference**

| Command                                       | Description                      |
| --------------------------------------------- | -------------------------------- |
| `npm install`                                 | Install all project dependencies |
| `npx json-server --watch db.json --port 3001` | Launch local REST API server     |
| `npm run dev` or `npm start`                  | Start the React frontend app     |

---

## 🧑‍💻 **How It Works**

* ⚙️ React frontend fetches and updates data using REST calls to `json-server`
* 📝 Changes are reflected live in `db.json`
* 🎨 Clean, user-friendly UI with visual separation of components
* 🌗 Light/dark mode toggled via CSS class switching

---

## ❓ **FAQ**

### ❔ **Where is my data stored?**

🗂️ All data is stored in `db.json` in the project root.

### ❔ **Can I use this in production?**

🚫 This setup is for local development and learning. For production, use a real backend.

### ❔ **How do I reset my data?**

🧹 Stop the server, edit or delete `db.json`, and restart `json-server`.

---


