
export class ClientException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "ClientException";
    }
}