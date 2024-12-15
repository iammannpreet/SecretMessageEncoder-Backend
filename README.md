
# Secret Code Encoder

Secret Code Encoder is a fun and interactive project that encodes strings into unique **x-y coordinate-based shapes** and renders them dynamically using a combination of **Three.js** and **GSAP animations**. This project leverages modern web technologies for an engaging, minimalist interface while showcasing a creative approach to visualizing data.

---

## Features

- **String-to-Coordinates Encoding**:
  - Any input string is encoded into a set of x-y coordinates mapped to specific shapes (characters).
  - Example mapping:
    ```json
    A: [
        "  ████░   ",
        " ███░██░  ",
        "██░   ██░ ",
        "████████░ ",
        "██░   ██░ ",
        "██░   ██░ "
    ]
    ```
- **Unique ID Generation**:
  - Each encoded string is saved with a unique ID in a **Firebase Firestore database**.
  - This ID is used to retrieve and render the shapes dynamically on the frontend.

- **Dynamic Rendering**:
  - The frontend allows users to **retrieve** encoded shapes or **create new ones**, all within the same page, featuring a **unique scrolling effect** and smooth GSAP animations.

- **Cross-Platform Deployment**:
  - **Frontend**: Built with **Three.js**, **Node.js**, and **Express.js**, deployed on **Netlify**.
  - **Backend**: Powered by **Node.js**, **Express.js**, and **Firebase**, deployed on **Render**.

---

## Tech Stack

### **Frontend**
- **Three.js**: For rendering dynamic and interactive 3D graphics.
- **Node.js**: For server-side scripting and RESTful API integration.
- **Express.js**: For efficient routing and middleware support.
- **Axios**: For seamless communication between frontend and backend.
- **GSAP**: For animations and creating a unique scrolling effect.
- **Netlify**: For deploying the frontend with CI/CD.

### **Backend**
- **Node.js**: Backend runtime environment.
- **Express.js**: REST API handling and routing.
- **Firebase Firestore**: Database for storing encoded strings with unique IDs.
- **Render**: For deploying the backend and ensuring scalable hosting.

---

## How It Works

### **Encoding a String**
1. Input any string on the frontend.
2. The backend encodes the string into a **character-to-shape mapping**, using x-y coordinates to represent each character as a set of shapes.
3. A **unique ID** is generated and saved in Firebase for retrieval.

### **Retrieving Encoded Data**
1. Use the unique ID to fetch the x-y coordinates and shape mapping from Firebase.
2. The frontend dynamically renders the encoded shapes using **Three.js**.

---

## Deployment

- **Frontend**: [CordVault Frontend](https://cordvault.netlify.app/)
- **Backend**: [CordVault Backend](https://secretmessageencoder-backend.onrender.com/)

---

## Features in Action

### **String Encoding Example**
Input string: `HELLO`

Encoded coordinates (simplified representation):
```json
H: [
    "██░   ██░ ",
    "██░   ██░ ",
    "████████░ ",
    "██░   ██░ ",
    "██░   ██░ ",
    "██░   ██░ "
]
E: [
    "███████░ ",
    "██░      ",
    "█████░   ",
    "██░      ",
    "███████░ "
]
L: [
    "██░      ",
    "██░      ",
    "██░      ",
    "██░      ",
    "███████░ "
]
O: [
    " █████░  ",
    "██░   ██░",
    "██░   ██░",
    "██░   ██░",
    " █████░  "
]
```

---

## Unique Scrolling Effect
- The frontend uses **GSAP animations** to create a seamless and visually appealing **scrolling interface**.
- Both rendering and input happen on the same page, providing a **unique, fluid user experience**.

---

## Installation

### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/iammannpreet/SecretMessageEncoder-Backend.git
   cd SecretMessageEncoder-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend:
   ```bash
   node index.js
   ```

### **Frontend**
1. Clone the repository:
   ```bash
   git clone https://github.com/iammannpreet/SecretMessageEncoder-Client.git
   cd SecretMessageEncoder-Client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run locally:
   ```bash
   npx vite
   ```

---

## Future Improvements
- **Enhanced Security**: Add authentication for saving/retrieving encoded data.
- **Custom Shapes**: Allow users to define custom character-to-shape mappings.
- **Advanced Visualization**: Explore 3D representations using **Three.js** for a more immersive experience.

---

## Author

**Manpreet Singh**  
A passionate full-stack developer building engaging projects with modern technologies.

Feel free to reach out for feedback or collaboration opportunities!

---
```
