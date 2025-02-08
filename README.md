## Blog Application

### Overview
This is a **full-stack blog application** with a backend built in **Java** and a frontend in **React + TypeScript**. The application allows users to browse and post photos, create posts, add comments, and manage their profiles.

### Features
- **User Authentication** (Login, Logout)
- **Home Feed**
  - View photos
  - Browse albums
  - Filter by user
  - Add and delete own photos
- **User Profile**
  - View user details
  - View user posts and photos
  - Edit own profile
- **Search Functionalities**
  - Search users by name
  - Search photos by ID or album
- **Posts Management**
  - View posts with author details
  - Add new posts
  - Delete own posts
- **Comments**
  - Add comments
  - Delete own comments

### Tech Stack
#### Backend
- **Java**
- **Spring Boot**
- **Flyway** (without schema definition)
- **Gradle** (for build management)

#### Frontend
- **React**
- **TypeScript**
- **CSS** (No Bootstrap or Tailwind CSS)

### Database Setup
Before running the application, make sure the database is properly set up. The backend will handle migrations using Flyway.

### How to Run
#### Backend
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd backend
   ```
2. Build the application:
   ```sh
   ./gradlew build
   ```
3. Run the application:
   ```sh
   java -jar build/libs/app.jar
   ```

#### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
