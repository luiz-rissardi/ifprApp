



export interface Handler{
    reportError(message:string):void;
    reportSuccess(message:string,type:string):void;
}