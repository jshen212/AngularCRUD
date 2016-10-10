import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { AppApiService, Person }      from './../../../shared/';

@Component({
  selector: 'app-person-list',
  template: `
  <i *ngIf="dataLoading" class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" aria-hidden="true"></i>
  <ul>
    <li *ngFor="let person of people" (click)="onClick(person)">
      {{person.firstName}} {{person.lastName}}
    </li>
  </ul>
  `
})
export class PersonListComponent implements OnInit {
  public people: Array<Person> = [];
  private dataLoading: boolean = false;

  constructor(public apiService: AppApiService,
              public router: Router,
              public route: ActivatedRoute) {}

  ngOnInit() {
    this.dataLoading = true;

    this.apiService.getPeople().subscribe(
      (res: any) => {
        this.dataLoading = false;
        this.people = res;
      }
    );
  }

  onClick(aPerson: Person) {
    this.router.navigate(
      ['person/detail/' + aPerson.id]
    );
  }

}