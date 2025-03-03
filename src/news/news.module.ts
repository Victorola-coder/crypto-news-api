import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { NewsScheduler } from "./news.scheduler";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService, NewsScheduler],
})
export class NewsModule {}
