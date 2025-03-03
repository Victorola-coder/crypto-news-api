import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsScheduler } from "./news.scheduler";
import { ScheduleModule } from "@nestjs/schedule";
import { NewsController } from "./news.controller";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService, NewsScheduler],
})
export class NewsModule {}
