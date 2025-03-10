export class DailyStatistics {
  date: string;
  ratio: number;
  newsCount: number;
  averageSentiment: number;
}

export class StatisticsResponseDto {
  ticker: string;
  startDate: string;
  endDate: string;
  statistics: DailyStatistics[];
}
