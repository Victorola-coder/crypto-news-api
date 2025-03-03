export class DailyStatistics {
  date: string;
  newsCount: number;
  ratio: number;
  averageSentiment: number;
}

export class StatisticsResponseDto {
  ticker: string;
  startDate: string;
  endDate: string;
  statistics: DailyStatistics[];
}
