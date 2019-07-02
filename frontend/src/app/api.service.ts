import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import { Policy} from "./policy";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1:8080";

  constructor(private httpClient: HttpClient) { }

  readPolicies(): Observable<Policy[]> {
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  createPolicy(policy: Policy): Observable<Policy> {
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/create.php`, policy);
  }

  updatePolicy(policy: Policy){
    return this.httpClient.put<Policy>(`${this.PHP_API_SERVER}/api/update.php`, policy);
  }

  deletePolicy(id: number) {
    return this.httpClient.delete(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }
}
