import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { CommandFacade } from 'src/app/facades/Command';

@Component({
  selector: 'app-inactive-command',
  templateUrl: './inactive-command.component.html',
  styleUrls: ['./inactive-command.component.scss']
})
export class InactiveCommandComponent {

  phoneControl: FormControl;

  constructor(
    formBuild: FormBuilder,
    private commandFacade: CommandFacade,
    @Inject(WarningHandlerService) private warningHandlerService: Handler,
  ) {
    this.phoneControl = formBuild.control([])
  }

  inactive() {
    const phoneNumber: string = this.phoneControl.value;
    if (phoneNumber.length > 10 && !Number.isNaN(Number(phoneNumber)) ) {
      this.commandFacade.inactiveCommand(phoneNumber);
    } else {
      this.warningHandlerService.reportError("numero de telefone inválido")
    }
  }
}
