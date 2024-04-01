import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import qrCodeGenerator from "qrcode-generator"
import { CommandsService } from 'src/app/core/services/HttpRequests/Commands/commands.service';
import { DOMManipulation } from 'src/app/shared/domManipulation/dommanipulation';

interface Command {
  commandId: number;
  commandUrlImg: string
}

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent extends DOMManipulation {

  commands: Command[] = [];

  constructor(private router:Router, private commandService: CommandsService, elementRef: ElementRef, dom: Renderer2) {
    super(elementRef, dom)
  }

  home(){
    this.router.navigate(["/home"])
  }

  print() {
    // Executa a impressão
    this.setAttributeStyle("buttons","display","none")
    window.print();
    this.setAttributeStyle("buttons","display","flex")
  }

  generateCommands() {
    this.commandService.createCommands()
      .subscribe((data: any[]) => {
        const qrCode = qrCodeGenerator(10, "M");
        data.forEach(item => {
          qrCode.addData(item.commandUrl);
          qrCode.make();
          const img = qrCode.createDataURL();
          this.commands.push({ commandUrlImg: img, commandId: item.commandId })
        })
      })
  }

}
