# React + Appwrite Blog

This is a full-stack blog application built with React (Vite), Redux Toolkit, Appwrite, and TailwindCSS.
It lets users sign up, log in, write posts, upload images, update their profile, and manage posts securely.

The project is designed to help you learn:

How to connect frontend (React) with backend (Appwrite)

How to manage authentication and sessions

How to perform CRUD operations on posts

How to manage global state using Redux

How to build a modern, responsive UI with TailwindCSS

How to deploy to production using Vercel and Appwrite Cloud

## Features Explained in Detail
##🔑 Authentication

We use Appwrite Authentication for login, signup, and logout.

When a user signs up, Appwrite creates a new user and stores their email/password securely.

On login, Appwrite issues a session token (saved in localStorage by default).

We use Redux Toolkit to store the user's session info in the frontend so that the UI knows if a user is logged in.

Protected routes (like "Add Post") check if the user is authenticated before rendering.

## 📝 Posts (CRUD Operations)

Posts are stored in an Appwrite Database Collection.
Each post contains:

title → post title

content → blog content (rich text/HTML)

featuredImage → file ID of an uploaded image

userId → the ID of the user who created the post

status → active/deleted

With this setup, a user can:

Create a post → Upload a featured image + content

Read posts → Fetch from database, filter by status = active

Update a post → Allowed only if the logged-in user owns the post

Delete a post → Removes the post and optionally its image

## 👤 Profile

The Profile Page lets users:

View their name and email

Update their name and email (updates Appwrite account)

Change their password

Upload a profile picture (stored in Appwrite Storage)

After updating, the Redux store is refreshed so that changes appear immediately in the UI (e.g., username in the navbar).

## 🖼 Image Uploads (Storage)

We use Appwrite Storage to store images.
There are two types of uploads:

Featured Images for Posts → Each blog post can have a thumbnail/banner image.

Profile Pictures → Each user can upload their own profile image.

The uploaded files are stored in a Bucket, and we use Appwrite’s getFileView() function to display them in React.

## 🔒 Protected Routes

Certain pages (like All Posts, Add Post, Profile) are only visible to logged-in users.
We use a component called AuthLayout that checks if the user is logged in:

If true → show the page.

If false → redirect to login.

This ensures unauthorized users cannot add/edit posts or view profile pages.

## 🎨 Responsive UI with TailwindCSS

TailwindCSS provides utility-first CSS classes.
Examples:

flex items-center justify-center → for centering content

rounded-xl shadow-md → for cards with rounded corners and shadows

grid gap-6 md:grid-cols-2 lg:grid-cols-3 → responsive grids

We used Tailwind to:

Create a modern, minimal UI

Make the blog responsive on all devices

Style buttons, forms, and layouts without writing long CSS files

## 🚀 Deployment

We deploy the project in two parts:

Frontend (React)

Deployed to Vercel
 (easy integration with GitHub)

Runs as a static site with API calls to Appwrite

Backend (Appwrite)

Hosted on Appwrite Cloud

Provides authentication, database, and storage services

Once deployed:

Vercel serves the frontend.

Appwrite handles API requests like login, createPost, uploadFile, etc.

## Project Structure Explained
src/
│── appwrite/         
│   ├── auth.js       # Authentication logic (login, signup, get current user)
│   ├── config.js     # Appwrite service for database & storage (CRUD)
│── components/       
│   ├── Header.jsx    # Navbar with links, logout, and profile icon
│   ├── Footer.jsx    # Footer section
│   ├── PostCard.jsx  # Card to display individual posts
│   ├── AuthLayout.jsx# Protects routes
│── pages/            
│   ├── Home.jsx      # Landing page showing recent posts
│   ├── Login.jsx     # Login form
│   ├── Signup.jsx    # Signup form
│   ├── Profile.jsx   # Profile management (update name, email, password, pic)
│   ├── AddPost.jsx   # Create new post
│   ├── EditPost.jsx  # Edit existing post
│   ├── Post.jsx      # Single post view
│   ├── AllPosts.jsx  # Show all posts of current user
│── store/            
│   ├── authSlice.js  # Redux slice for authentication
│   ├── store.js      # Redux store setup
│── App.jsx           # Root layout with header/footer
│── main.jsx          # Router setup

## What I Learned (In-Depth)

🔐 Authentication & Sessions
Learned how to handle signup/login with Appwrite and store session info in Redux.

🗄 Database CRUD
Understood how to create, fetch, update, and delete documents in Appwrite collections.

📸 File Uploads
Learned how to upload images to Appwrite Storage and use getFilePreview or getFileView for display.

⚛️ Redux Toolkit
Mastered global state management, e.g., keeping track of user data across components.

🎨 TailwindCSS
Practiced building responsive layouts using utility classes instead of writing custom CSS.

🌍 Deployment
Understood how to deploy frontend (Vercel) and backend (Appwrite Cloud) separately and make them work together.

## Future Improvements

Add likes and comments system

Implement categories/tags for better filtering

Add rich text editor (already partly implemented with content field)

Profile picture cropping/resizing

Add dark mode support 🌙
