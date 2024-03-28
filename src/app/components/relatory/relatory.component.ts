import { Component, Input } from '@angular/core';
import { TopProductssSelling } from 'src/app/core/models/TopProductSelling';

@Component({
  selector: 'app-relatory',
  templateUrl: './relatory.component.html',
  styleUrls: ['./relatory.component.scss']
})
export class RelatoryComponent {
  @Input() totalPriceOfOrders: number;
  @Input() productSelling: TopProductssSelling[];
}
