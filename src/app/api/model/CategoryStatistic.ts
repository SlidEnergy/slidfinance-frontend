import { MonthStatistic } from './monthStatistic';


export interface CategoryStatistic {
    categoryId?: string;
    months?: Array<MonthStatistic>;
}
