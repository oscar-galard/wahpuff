# Guitar Lesson Platform Docker Setup

This project uses Laravel with React and Inertia for a guitar lesson platform.

## Prerequisites

- Docker Engine
- Docker Compose

## Setup Instructions

1. Clone the repository
2. Copy `.env.example` to `.env` and adjust database settings if needed
3. Run the following command to start all services:

```bash
docker-compose up -d
```

4. Access the application at http://localhost

## Services

- **App**: Laravel application (PHP-FPM)
- **Nginx**: Web server
- **PostgreSQL**: Database

## Useful Commands

- Stop containers: `docker-compose down`
- View logs: `docker-compose logs -f`
- Run artisan commands: `docker-compose exec app php artisan [command]`
- Run npm commands: `docker-compose exec app npm run [command]`