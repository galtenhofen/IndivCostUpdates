import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  viewController: string;

  constructor(public route: ActivatedRoute) {
    
  }

    
    ngOnInit() {
      this.viewController = this.route.snapshot.url.toString();
      console.log("In HomeComponent OnInIt.  View: " + this.viewController);
    }

  
    

}
