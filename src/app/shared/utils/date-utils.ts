import * as moment from 'moment';

export function toISOStringWithoutTimeZone(date: Date) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
}
