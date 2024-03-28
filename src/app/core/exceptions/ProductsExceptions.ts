
export class ProductsException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "ProductsExceptions";
    }
}