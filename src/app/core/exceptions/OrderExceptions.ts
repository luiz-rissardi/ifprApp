
export class OrderException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "OrderExceptions";
    }
}