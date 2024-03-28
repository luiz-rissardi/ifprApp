import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { CommandFacade } from 'src/app/facades/Command';

@Component({
  selector: 'app-reset-command',
  templateUrl: './reset-command.component.html',
  styleUrls: ['./reset-command.component.scss']
})
export class ResetCommandComponent {

  commandControl: FormControl;

  constructor(
    formBuild: FormBuilder,
    private commandFacade: CommandFacade
  ) {
    this.commandControl = formBuild.control([])
  }

  resetCommand() {
    const commandId = this.commandControl.value;
    this.commandFacade.resetCommand(commandId)
  }
}
