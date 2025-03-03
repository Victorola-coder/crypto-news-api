import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post("bulk")
  async createMany(@Body() createNewsDto: CreateNewsDto[]) {
    return this.newsService.createMany(createNewsDto);
  }

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Get("ticker/:ticker")
  async findByTicker(@Param("ticker") ticker: string) {
    return this.newsService.findByTicker(ticker);
  }

  @Get("sentiment/:sentiment")
  async findBySentiment(@Param("sentiment", ParseIntPipe) sentiment: number) {
    return this.newsService.findBySentiment(sentiment);
  }
}
