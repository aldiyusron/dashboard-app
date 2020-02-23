import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faAngleDown, faEllipsisV, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import { ChartDB } from '../../fake-db/chart-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  disabled: boolean;
  showChart: boolean;

  period: string;
  dateString: string;
  faAngleDown = faAngleDown;
  faEllipsisV = faEllipsisV;
  faAngleUp = faAngleUp;

  periodList: string[] = ['today', 'yesterday', 'last 7 days', 'last 30 days', 'this month', 'custom'];
  series: any[] = [];

  startDate: Date;
  endDate: Date;
  yesterday: NgbDateStruct;

  options = { year: 'numeric', month: 'long', day: 'numeric' };

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  public chartDB: any;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { 
    this.disabled = true;
    this.showChart = true;

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.chartDB = ChartDB.bar2CAC;
    
    let today: Date = new Date();
    this.yesterday = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate() - 1
    }
  }

  ngOnInit(): void {
    this.setPeriodAndDate('last 7 days');
  }

  setPeriod(period: string) {
    this.period = period;
    this.setDate(period);
  }

  setPeriodAndDate(period: string) {
    this.setPeriod(period);
    this.apply();
  }

  setDate(period: string) {
    this.disabled = true;
    let today: Date = new Date();
    if(period.toLowerCase() == 'today') {
      this.startDate = today;
      let todayTmp: NgbDateStruct = {
        year: this.startDate.getFullYear(),
        month: this.startDate.getMonth() + 1,
        day: this.startDate.getDate()
      }
      this.fromDate = NgbDate.from(todayTmp);
      this.toDate = null;
    } else if(period.toLowerCase() == 'yesterday') {
      this.startDate = new Date(today.setDate(today.getDate() - 1));
      this.endDate = null;
      let todayTmp: NgbDateStruct = {
        year: this.startDate.getFullYear(),
        month: this.startDate.getMonth() + 1,
        day: this.startDate.getDate()
      }
      this.fromDate = NgbDate.from(todayTmp);
      this.toDate = null;

      this.chartDB.series = [{
        name: 'Net',
        data: [21, 7, 25, 13, 22, 8]
      }, {
        name: 'Gross',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'APV',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'UPT',
        data: [11, 17, 15, 15, 21, 14]
      }]
    } else if(period.toLowerCase() == 'last 7 days') {
      this.startDate = today;
      this.endDate = new Date();

      this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() - 7));
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 1));
      
      let start: NgbDateStruct = {
        year: this.startDate.getFullYear(),
        month: this.startDate.getMonth() + 1,
        day: this.startDate.getDate()
      }
      let end: NgbDateStruct = {
        year: this.endDate.getFullYear(),
        month: this.endDate.getMonth() + 1,
        day: this.endDate.getDate()
      }
      this.fromDate = NgbDate.from(start);
      this.toDate = NgbDate.from(end);

      this.chartDB.series = [{
        name: 'Net',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'Gross',
        data: [21, 7, 25, 13, 22, 8]
      }, {
        name: 'APV',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'UPT',
        data: [13, 23, 20, 8, 13, 27]
      }]
    } else if(period.toLowerCase() == 'last 30 days') {
      this.startDate = today;
      this.endDate = new Date();
      
      this.startDate = new Date(today.setDate(today.getDate() - 30));
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 1));
      
      let start: NgbDateStruct = {
        year: this.startDate.getFullYear(),
        month: this.startDate.getMonth() + 1,
        day: this.startDate.getDate()
      }
      let end: NgbDateStruct = {
        year: this.endDate.getFullYear(),
        month: this.endDate.getMonth() + 1,
        day: this.endDate.getDate()
      }
      this.fromDate = NgbDate.from(start);
      this.toDate = NgbDate.from(end);

      this.chartDB.series = [{
        name: 'Net',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'Gross',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'APV',
        data: [21, 7, 25, 13, 22, 8]
      }, {
        name: 'UPT',
        data: [44, 55, 41, 67, 22, 43]
      }]
    } else if(period.toLowerCase() == 'this month') {
      this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      let start: NgbDateStruct = {
        year: this.startDate.getFullYear(),
        month: this.startDate.getMonth()+1,
        day: this.startDate.getDate()
      }
      let end: NgbDateStruct = {
        year: this.endDate.getFullYear(),
        month: this.endDate.getMonth()+1,
        day: this.endDate.getDate()
      }
      this.fromDate = NgbDate.from(start);
      this.toDate = NgbDate.from(end);

      this.chartDB.series = [{
        name: 'Net',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'Gross',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'APV',
        data: [21, 7, 25, 13, 22, 8]
      }, {
        name: 'UPT',
        data: [44, 55, 41, 67, 22, 43]
      }]
    } else if(period.toLowerCase() == 'custom') {
      this.disabled = false;
    }
  }

  apply() {
    if(this.period == 'custom') {
      let start = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
      let end = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;
      this.startDate = new Date(start);
      this.endDate = new Date(end);
      if(!this.checkMin(this.startDate, this.endDate)) { 
        Swal.fire('Error', 'Minimum time range is 1 day', 'error');
      } else if(!this.checkMax(this.startDate, this.endDate)) {
        Swal.fire('Error', 'Maximum time range is 6 months', 'error');
      } else {
        this.saveDate();
        setTimeout(() => {
          this.showChart = true;
        }, 1000);
        this.showChart = false;
      }
    } else {
      this.saveDate();
      setTimeout(() => {
        this.showChart = true;
      }, 1000);
      this.showChart = false;
    }
    
  }

  saveDate() {
    if(this.toDate == null) {
      this.dateString = this.startDate.toLocaleDateString('id-ID', this.options);
    } else {
      this.dateString = `${this.startDate.toLocaleDateString('id-ID', this.options)} - ${this.endDate.toLocaleDateString('id-ID', this.options)}`;
    }
  }

  checkMin(start: Date, end: Date): boolean {
    return end.getDate() - start.getDate() > 0;
  }

  checkMax(start: Date, end: Date): boolean {
    // assumption 6 months = 30 days * 6 = 180 days
    return end.getDate() - start.getDate() <= 180;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
