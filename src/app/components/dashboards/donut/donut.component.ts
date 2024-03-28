import { Component, Input, OnInit } from '@angular/core';
import { ApexChart, ApexPlotOptions, ApexResponsive } from 'ngx-apexcharts';
import { TopProductssSelling } from 'src/app/core/models/TopProductSelling';
import { TopProductsSellingState } from 'src/app/core/states/TopProductSelling';


interface TopProductss {
  chartOptions: ApexChart;
  responsive: ApexResponsive[];
  pieOptions: ApexPlotOptions;
  labels: string[];
  series: number[];
}

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent {

  constructor(private topProductsState: TopProductsSellingState) {
    this.topProductsState.onProductsListChange().subscribe((value: TopProductssSelling[]) => {
      this.options.labels = value.map(el => el.productName)
      this.options.series = value.map(el => Number(el.totalPrice))
    })
  }

  private isMobile = window.innerWidth < 500 ? "400px" : "600px";

  options: TopProductss = {
    chartOptions: {
      height: this.isMobile,
      width: this.isMobile,
      fontFamily: "monospace",
      id: "teste",
      type: "donut",
    },
    pieOptions: {
      pie: {
        donut: {
          labels: {
            name: {
              show: true,
            },
            value: {
              color: "blue"
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 300,
      options: {
        legend: {
          position: ''
        }
      }
    }],
    labels: ['cachorro-quente', 'refrigerante', 'pastel', 'espetinho'],
    series: [332, 820, 243, 165]
  }

}



