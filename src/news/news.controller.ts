import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { PaginationDto } from "./dto/pagination.dto";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post("bulk")
  async createMany(@Body() createNewsDto: CreateNewsDto[]) {
    return this.newsService.createMany(createNewsDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.newsService.findAllPaginated(
      paginationDto.page,
      paginationDto.limit
    );
  }

  @Get("ticker/:ticker")
  async findByTicker(@Param("ticker") ticker: string) {
    return this.newsService.findByTicker(ticker);
  }

  @Get("sentiment/:sentiment")
  async findBySentiment(@Param("sentiment", ParseIntPipe) sentiment: number) {
    return this.newsService.findBySentiment(sentiment);
  }

  @Get("statistics/:ticker")
  async getStatistics(
    @Param("ticker") ticker: string,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) {
    return this.newsService.getNewsStatistics(ticker, startDate, endDate);
  }
}
