import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsScheduler } from "./news.scheduler";
import { NewsController } from "./news.controller";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService, NewsScheduler],
})
export class NewsModule {}
