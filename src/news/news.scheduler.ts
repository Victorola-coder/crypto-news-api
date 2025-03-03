import * as fs from "fs";
import * as path from "path";
import { NewsService } from "./news.service";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class NewsScheduler {
  private readonly logger = new Logger(NewsScheduler.name);
  private currentIndex = 0;

  constructor(private readonly newsService: NewsService) {}

  @Cron(CronExpression.EVERY_MINUTE) // more frequent for demo purposes
  async handleCron() {
    try {
      const mockNewsData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../mock_news.json"), "utf-8")
      );

      // Process one news article at a time
      if (this.currentIndex < mockNewsData.length) {
        const newsItem = mockNewsData[this.currentIndex];
        await this.newsService.createMany([newsItem]);
        this.logger.log(
          `Processed news item ${this.currentIndex + 1}/${mockNewsData.length}`
        );
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Reset for next cycle
        this.logger.log("Completed processing all news items");
      }
    } catch (error) {
      this.logger.error("Error processing news item:", error);
    }
  }
}
