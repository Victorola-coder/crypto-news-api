import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';

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
          equals: ticker,
          mode: 'insensitive',
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
} 