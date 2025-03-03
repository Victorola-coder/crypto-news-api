import { IsString, IsDateString } from "class-validator";

export class GetStatsDto {
  @IsString()
  ticker: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
