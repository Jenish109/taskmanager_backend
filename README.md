# Server Setup

## Prerequisites
- Node.js (>= 16.x)
- MongoDB installed and running
- npm or yarn

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/yourdatabase
   PORT=5000
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```sh
   npm start
   ```
   or in development mode with nodemon:
   ```sh
   npm run dev
   ```

5. The server should now be running at `http://localhost:5000`.
