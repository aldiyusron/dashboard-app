import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showCalendar: boolean;

  period: string;
  dateString: string;
  faAngleDown = faAngleDown;

  startDate: Date;
  endDate: Date;

  options = { year: 'numeric', month: 'long', day: 'numeric' };

  periodList: string[] = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'];

  constructor() { 
    this.showCalendar = false;
  }

  ngOnInit(): void {
    this.setPeriod(this.periodList[2]);
  }

  setPeriod(period: string) {
    this.period = period;
    this.setDate(period);
  }

  setDate(period: string) {
    if(period.toLowerCase() == 'today') {
      this.startDate = new Date();
      this.dateString = this.startDate.toLocaleDateString('id-ID', this.options);
    } else if(period.toLowerCase() == 'yesterday') {
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 1);
      this.dateString = this.startDate.toLocaleDateString('id-ID', this.options);
    } else if(period.toLowerCase() == 'last 7 days') {
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 1);
      this.endDate = new Date();
      this.endDate.setDate(this.endDate.getDate() - 7);
      this.dateString = `${this.startDate.toLocaleDateString('id-ID', this.options)} - ${this.endDate.toLocaleDateString('id-ID', this.options)}`;
    } else if(period.toLowerCase() == 'last 30 days') {
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 1);
      this.endDate = new Date();
      this.endDate.setDate(this.endDate.getDate() - 30);
      this.dateString = `${this.startDate.toLocaleDateString('id-ID', this.options)} - ${this.endDate.toLocaleDateString('id-ID', this.options)}`;
    } else if(period.toLowerCase() == 'this month') {
      let date = new Date();
      this.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.dateString = `${this.startDate.toLocaleDateString('id-ID', this.options)} - ${this.endDate.toLocaleDateString('id-ID', this.options)}`;
    }
  }

  checkMin(start: Date, end: Date): boolean {
    return true;
  }

  checkMax(start: Date, end: Date): boolean {
    return true;
  }

}
