import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis } from 'ngx-apexcharts';


interface ProductSales {
  chartOptions: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis
}

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  @Input() productsBetweenDateLabels: string[];
  @Input() productsBetweenDateTotalPrices: number[];
  private isMobile = window.innerWidth < 500 ? "300px" : "500px";

  ngOnInit(): void {
    this.options.series[0].data = this.productsBetweenDateTotalPrices;
    this.options.xaxis.categories = this.productsBetweenDateLabels;
  }

  options: ProductSales = {
    series: [{
      name: 'valor R$',
      data: []
    }],
    chartOptions: {
      height: this.isMobile,
      width: this.isMobile,
      fontFamily: "monospace",
      id: "betweenDate",
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'

      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [],
    }
  }
}
