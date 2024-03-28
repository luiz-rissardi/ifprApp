import { Component, OnInit } from '@angular/core';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})
export class SpinnerLoaderComponent implements OnInit {
  public showSpinner: boolean;
  constructor(private spinnerState: LoaderSpinnerState) {
  }

  ngOnInit(): void {
    this.spinnerState.onChangeState()
      .subscribe(data => {
        this.showSpinner = data
      })
  }
}
