
export class UserException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "UserExceptions";
    }
}