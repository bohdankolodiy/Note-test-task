import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  formatToLocaleDateTime(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  getDateDiff(sendDate: string): string {
    const sendDateTime = new Date(sendDate).getTime();
    // const nowTime = new Date(this.formatToLocaleDateTime(new Date())).getTime();
    const nowTime = new Date().getTime();
    const diffTime = Math.abs(nowTime - sendDateTime);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    console.log(diffDays, diffHours, diffMinutes);

    if (diffDays) return diffDays + ' d';
    if (diffHours) return diffHours + ' h';
    if (diffMinutes) return diffMinutes + ' m';
    return '> 1 m';
  }
}
