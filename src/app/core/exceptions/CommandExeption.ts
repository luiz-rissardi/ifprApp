export class CommandException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "CommandException";
    }
}