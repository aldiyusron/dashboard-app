import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faAngleDown, faEllipsisV, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { ChartDB } from '../../fake-db/chart-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  disabled: boolean;

  period: string;
  dateString: string;
  faAngleDown = faAngleDown;
  faEllipsisV = faEllipsisV;
  faAngleUp = faAngleUp;

  startDate: Date;
  endDate: Date;

  options = { year: 'numeric', month: 'long', day: 'numeric' };

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  public chartDB: any;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { 
    this.disabled = true;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.chartDB = ChartDB;
  }

  ngOnInit(): void {
    this.setPeriod('last 7 days');
    this.apply();
  }

  setPeriod(period: string) {
    this.period = period;
    this.setDate(period);
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
    } else if(period.toLowerCase() == 'custom') {
      let start = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
      let end = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;
      this.startDate = new Date(start);
      this.endDate = new Date(end);
    }
  }

  apply() {
    if(this.period == 'custom') {
      this.setDate('custom');
    }
    if(this.toDate == null) {
      this.dateString = this.startDate.toLocaleDateString('id-ID', this.options);
    } else {
      this.dateString = `${this.startDate.toLocaleDateString('id-ID', this.options)} - ${this.endDate.toLocaleDateString('id-ID', this.options)}`;
    }
  }

  checkMin(start: Date, end: Date): boolean {
    return true;
  }

  checkMax(start: Date, end: Date): boolean {
    return true;
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
