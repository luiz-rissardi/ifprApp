import { Injectable } from '@angular/core';
import { ServiceBase } from '../shared/serviceBase';
import { HttpClient } from '@angular/common/http';
import { CommandException } from 'src/app/core/exceptions/CommandExeption';

@Injectable({
  providedIn: 'root'
})
export class CommandsService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  getAvaibleCommand() {
    try {
      return this.http.get(this.uri + "/command", this.options)
    } catch (error) {
      throw new CommandException("não foi possivle buscar comanda valida!")
    }
  }

  updateStatusCommand(commandId: number, avaible: boolean) {
    try {
      const body = { commandId, avaible }
      return this.http.patch(this.uri + "/command", body, this.options)
    } catch (error) {
      throw new CommandException("não foi possivle atualizar a comanda!")
    }
  }

  inactiveCommand(commandId: number) {
    try {
      const body = { commandId }
      return this.http.post(this.uri + "/command/inactive", body, this.options);
    } catch (error) {
      throw new CommandException("não foi possivle atualizar a comanda!")
    }
  }
  
  getCommandByUrl(commandUrl: string){
    try {
      const body = { commandUrl };
      return this.http.post(this.uri + "/command",body,this.options);
    } catch (error) {
      throw new CommandException("não foi possivle pegar a comanda!")
    }
  }
}
