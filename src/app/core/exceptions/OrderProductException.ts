

export class OrderProductsException extends Error{
    constructor(message:string){
        super(message);
        this.name = "ProductsOrderException"
    }
}