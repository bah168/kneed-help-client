import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'



@Injectable()
export class SecurityService {
    constructor() { }

    getSecurityServer() {
        return environment.apiUrl;
    }
}
