import { HttpClient } from "@angular/common/http"

export class ServiceBase {
    protected headers = {
        'Content-Type': 'application/json'
    }
    protected options = { headers: this.headers }
    protected uri = "http://localhost:8723/api";

    constructor(protected http: HttpClient) {
    }
}