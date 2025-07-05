# 🍲 ProjectRecipes - Fullstack Recipe Website

A fullstack web application for browsing, adding, and managing recipes.

## 🧱 Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js + Express
- **Database**: MongoDB

## 📁 Project Structure

```
ProjectRecipes/
├── recipesAngular/   ← Angular client
├── recipesNodeJs/    ← Node.js server
```

## 🚀 How to Run the Project

### 1. Install dependencies

In each folder (`recipesAngular` and `recipesNodeJs`), run:

```bash
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your machine.  
(You can use `mongod` or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 3. Start the backend

```bash
cd recipesNodeJs
npm start
```

### 4. Start the frontend

In a separate terminal:

```bash
cd recipesAngular
ng serve
```

Then open your browser at:  
📍 http://localhost:4200

---

## 💡 Notes

- Create a `.env` file inside `recipesNodeJs/` with your environment variables (like MongoDB connection string)
- You can rename this project folder or repository to anything you like (`fullstack-recipes-by-miryam` for example 😉)

---

## 📷 Preview (optional)

If you want, you can add a screenshot or video here to show what the app looks like:

```md
![Preview](preview.png)
```
