import { Component, OnInit} from '@angular/core';
import { BodyPart } from '../../models/body-part.model';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { BodySubpart } from '../../models/body-subpart.model';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  bodyPartId:any;
  bodyPart: BodyPart;
  subparts: BodySubpart[];
  imagePath: string;
  message: string;



  constructor(private route:ActivatedRoute,
              private appService: AppService,
              private security: SecurityService) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.bodyPartId = params['id']; });
    this.getBodyPart();
    this.getSubparts();

  }

  getBodyPart(){
    this.appService.getOneBodyPart(this.bodyPartId).subscribe(data => {
    this.bodyPart = data['body_part'];
    this.imagePath = this.security.getSecurityServer() + 'api/image/' + this.bodyPart.image_name;
  },
    error => {
    });
  }

  getSubparts(){
    this.appService.getSubparts(this.bodyPartId).subscribe(data =>{
      this.subparts = data['subparts'];
    })
  }

  print(name:string){
    this.message = name;
  }



}
