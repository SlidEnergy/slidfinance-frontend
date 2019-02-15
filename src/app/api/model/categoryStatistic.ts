import { MonthStatistic } from './monthStatistic';


export interface CategoryStatistic {
    categoryId?: number;
    months?: Array<MonthStatistic>;
}
