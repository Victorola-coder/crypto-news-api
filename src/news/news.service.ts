import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNewsDto } from "./dto/create-news.dto";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async createMany(data: CreateNewsDto[]) {
    return this.prisma.news.createMany({
      data,
    });
  }

  async findAll() {
    return this.prisma.news.findMany();
  }

  async findByTicker(ticker: string) {
    return this.prisma.news.findMany({
      where: {
        ticker: {
          equals: ticker.toUpperCase(),
        },
      },
    });
  }

  async findBySentiment(sentiment: number) {
    return this.prisma.news.findMany({
      where: {
        sentiment,
      },
    });
  }

  async getNewsStatistics(ticker: string, startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Get all news within the date range
    const allNewsInRange = await this.prisma.news.findMany({
      where: {
        date: {
          gte: Math.floor(start.getTime() / 1000),
          lte: Math.floor(end.getTime() / 1000),
        },
      },
    });

    // Get coin specific news
    const coinNews = allNewsInRange.filter(
      (news) => news.ticker.toUpperCase() === ticker.toUpperCase()
    );

    // Calculate statistics per day
    const stats = new Map();

    for (const news of allNewsInRange) {
      const day = new Date(news.date * 1000).toISOString().split("T")[0];
      if (!stats.has(day)) {
        stats.set(day, {
          totalNews: 0,
          coinNews: 0,
          sentimentSum: 0,
          coinSentimentSum: 0,
        });
      }

      const dayStats = stats.get(day);
      dayStats.totalNews++;

      if (news.ticker.toUpperCase() === ticker.toUpperCase()) {
        dayStats.coinNews++;
        dayStats.coinSentimentSum += news.sentiment;
      }
    }

    // Format results
    const results = Array.from(stats.entries()).map(([day, data]) => ({
      date: day,
      newsCount: data.coinNews,
      ratio: data.totalNews > 0 ? data.coinNews / data.totalNews : 0,
      averageSentiment:
        data.coinNews > 0 ? data.coinSentimentSum / data.coinNews : 0,
    }));

    return results;
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.news.findMany({
        skip,
        take: limit,
        orderBy: {
          date: "desc",
        },
      }),
      this.prisma.news.count(),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
