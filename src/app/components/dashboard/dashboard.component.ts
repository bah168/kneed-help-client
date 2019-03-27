import { Component, OnInit } from '@angular/core';
import { BodyPart } from '../../models/body-part.model';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bodyParts: BodyPart[];

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.getBodyParts();
  }

  getBodyParts(){
    this.appService.getBodyParts().subscribe(data =>{
      this.bodyParts = data['body_parts'];
      console.log(this.bodyParts)
    });
  }



}
