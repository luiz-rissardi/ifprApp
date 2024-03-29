import { HttpClient } from "@angular/common/http"

export class ServiceBase {
    protected headers = {
        'Content-Type': 'application/json'
    }
    protected options = { headers: this.headers }
    protected uri = "https://festajunina-8da51b682b64.herokuapp.com/api";

    constructor(protected http: HttpClient) {
    }
}