import { Component, OnInit, Input } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { ChartService } from 'src/app/service/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartID: string;
  @Input() chartConfig: any;
  @Input() xAxis: any;
  @Input() newData: any;

  public chart: any;

  constructor(private apexEvent: ChartService) { }

  ngOnInit() {
    setTimeout(() => {
      this.chart = new ApexCharts(document.querySelector('#' + this.chartID), this.chartConfig);
      this.chart.render();
    });

    this.apexEvent.changeTimeRange.subscribe(() => {
      if (this.xAxis) {
        this.chart.updateOptions({
          xaxis: this.xAxis
        });
      }
    });

    this.apexEvent.changeSeriesData.subscribe(() => {
      if (this.newData) {
        this.chart.updateSeries([{
          data: this.newData
        }]);
      }
    });
  }

}
