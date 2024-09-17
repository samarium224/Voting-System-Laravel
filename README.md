# MIST Innovation Club Voting App

This Laravel application, built with Breeze, Inertia, and Laratrust, provides a robust voting or polling system for university clubs or departments. It addresses the need for engaging and efficient election processes.

### Key Features
- User Roles: Admin: Can create and manage elections, view results, and manage users.
- Voter: Can participate in elections by casting votes.
- Election Management: Create and customize elections with specific voting options. Set voting deadlines and eligibility criteria.
- Secure Voting: Implement measures to prevent fraud and ensure the integrity of votes.
- Real-time Results: Display election results in real-time, providing transparency and excitement.
- User-friendly Interface: Intuitive design and navigation for both administrators and voters.

### Technologies Used
- Laravel: A popular PHP framework for building web applications.
- Breeze: A Laravel authentication system providing a quick start.
- Inertia.js: A server-side rendered JavaScript library for building modern single-page applications.
- Laratrust: A package for managing roles and permissions in Laravel applications.

### Getting Started
Create a .env file by copying .env.example and modify the necessary variables.

Clone the project
```bash
  git clone https://link-to-project
```

Go to the project directory
```bash
  cd my-project
```
Install Dependencies:
```Bash
composer install
npm install
```

Run Database Migrations:
```
php artisan migrate
```

Start the Development Server:
```
npm run dev
php artisan serve
```

### Contributing

We welcome contributions to improve this application. Feel free to submit pull requests or report issues.
