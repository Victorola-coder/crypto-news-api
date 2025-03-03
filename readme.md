# Crypto News API

A NestJS-based REST API that provides cryptocurrency news data with automated updates using cron jobs.

## Features

- RESTful API endpoints for crypto news
- Automated data updates using cron jobs
- SQLite database with Prisma ORM
- Data validation using class-validator
- TypeScript support

## Tech Stack

- NestJS (^10.0.0)
- Prisma ORM
- SQLite
- TypeScript
- class-validator & class-transformer

## Project Structure

src/
├── main.ts # Application entry point
├── app.module.ts # Root module
├── prisma/
│ ├── prisma.service.ts # Prisma service
│ └── prisma.module.ts # Prisma module
└── news/
├── news.controller.ts # News endpoints
├── news.service.ts # News business logic
├── news.module.ts # News module configuration
├── news.scheduler.ts # Cron job scheduler
└── dto/
└── create-news.dto.ts # Data transfer object

## API Endpoints

### GET /news

Get all news entries

### GET /news/ticker/:ticker

Get news by cryptocurrency ticker (e.g., BTC, ETH)

### GET /news/sentiment/:sentiment

Get news by sentiment (-1, 0, 1)

### POST /news/bulk

Create multiple news entries

## Data Model

```prisma
model News {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  date        Int
  platform    String
  author      String
  ticker      String
  sentiment   Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Setup & Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd crypto-news-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Seed initial data:

```bash
npm run seed
```

6. Start the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

## Scripts

- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run dev` - Start the development server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run seed` - Seed the database

## Automated Updates

The application uses a cron job (configured in `news.scheduler.ts`) to update the news data every hour. The scheduler:

- Reads from the mock_news.json file
- Updates the database with new entries
- Logs the update status

## Error Handling

The API includes:

- Input validation using class-validator
- Global validation pipe
- Try-catch blocks for database operations
- Proper error logging

## Development

1. Make sure to run `npm run prisma:generate` after any schema changes
2. Use `npm run prisma:migrate` to apply database changes
3. The cron job runs every hour, but you can modify the interval in `news.scheduler.ts`

## Testing

To test the API endpoints:

```bash
# Get all news
curl http://localhost:3000/news

# Get news by ticker
curl http://localhost:3000/news/ticker/BTC

# Get news by sentiment
curl http://localhost:3000/news/sentiment/1

# Create bulk news entries
curl -X POST -H "Content-Type: application/json" -d @mock_news.json http://localhost:3000/news/bulk
```
