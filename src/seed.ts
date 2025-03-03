import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  try {
    const mockNewsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../mock_news.json"), "utf-8")
    );

    await prisma.news.createMany({
      data: mockNewsData,
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
