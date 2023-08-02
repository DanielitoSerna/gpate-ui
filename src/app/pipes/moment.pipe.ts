import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class MomentPipe implements PipeTransform {
    transform(value: Date | moment.Moment, dateFormat: string): any {
        if(value != null) {
            let myMoment: moment.Moment = moment(value).zone('+00');
            return myMoment.format(dateFormat);
        } else {
            return '';
        }
    }

    static transform(date: Date | moment.Moment) {
        if(date != null) {
            let myMoment: moment.Moment = moment(date).zone('+00');
            return myMoment.format('DD-MM-YYYY');
        } else {
            return date;
        }

    }
}