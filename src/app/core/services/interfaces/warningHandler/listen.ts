import { Subject } from "rxjs";



export interface Listen{
    listenFeedBack():Subject<string>;
}