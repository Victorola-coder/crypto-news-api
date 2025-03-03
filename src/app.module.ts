import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [NewsModule, PrismaModule],
})
export class AppModule {} 