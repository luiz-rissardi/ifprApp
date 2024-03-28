import { Component } from '@angular/core';
import { CommandState } from 'src/app/core/states/Command';

@Component({
  selector: 'app-command-modal',
  templateUrl: './command-modal.component.html',
  styleUrls: ['./command-modal.component.scss']
})
export class CommandModalComponent {
  showModalCommand: boolean = false;
  commandNumber!: number;

  constructor(private commandState: CommandState) {
    this.commandState.onChangeAccount().subscribe(data => {
      this.showModalCommand = data.show;
      this.commandNumber = data.commandId
    })
  }
  
  close(){
    this.showModalCommand = false;
  }
}
