import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NewsService } from "./news.service";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class NewsScheduler {
  private readonly logger = new Logger(NewsScheduler.name);

  constructor(private readonly newsService: NewsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      const mockNewsData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../mock_news.json"), "utf-8")
      );

      await this.newsService.createMany(mockNewsData);
      this.logger.log("News data updated successfully");
    } catch (error) {
      this.logger.error("Error updating news data:", error);
    }
  }
}
