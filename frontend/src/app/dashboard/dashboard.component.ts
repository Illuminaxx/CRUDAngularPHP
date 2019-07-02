import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Policy} from "../policy";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  policies: Policy[];
  selectedPolicy: Policy = {id: null, number: null, amount: null};

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.readPolicies();
  }

  readPolicies() {
    this.apiService.readPolicies().subscribe((policies: Policy[]) => {
      this.policies = policies;
      console.log(policies);
    })
  }

  createOrUpdatePolicy(form){
    if(this.selectedPolicy && this.selectedPolicy.id) {
      form.value.id = this.selectedPolicy.id;
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy)=> {
        console.log("Policy updated", policy);
      });
      this.readPolicies();
    } else {
      this.apiService.createPolicy(form.value).subscribe((policy: Policy) => {
        console.log("Policy created, ", policy);
      });
      this.readPolicies();
    }
  }

  selectPolicy(policy: Policy) {
    this.selectedPolicy= policy;
  }

  deletePolicy(id){
    this.apiService.deletePolicy(id).subscribe((policy: Policy)=> {
      console.log("Policy deleted, ", policy);
    });
    this.readPolicies();
  }

}
