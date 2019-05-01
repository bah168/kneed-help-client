import { Component, OnInit} from '@angular/core';
import { BodyPart } from '../../models/body-part.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { BodySubpart } from '../../models/body-subpart.model';
import { Symptom } from '../../models/symptom.model';
import { SecurityService } from '../../services/security.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  currentPage: number = 1;
  maxSize: number = 10;
  symptomForm: FormGroup;
  symptoms: Symptom[];
  bodyPartId:any;
  bodyPart: BodyPart;
  subparts: BodySubpart[];
  imagePath: string;
  message: string;
  symptomIdList: string[] = [];
  showForm: Boolean;
  subpartId: string;



  constructor(private route:ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private security: SecurityService,
              protected auth: AuthService,
              ) {
                this.symptomForm = new FormGroup({});
              }

  ngOnInit() {
    this.route.params.subscribe(params => { this.bodyPartId = params['id']; });
    this.getBodyPart();
    this.getSubparts();
    this.message = "Please select the location of your pain on the photo.";
    this.showForm = false;

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

  onSelectSubpart(id:string){
    this.message = "Please check all symptoms you are experiencing.";
    this.subpartId = id;
    this.getSymptomsPaginated();
    this.displayForm();
  }

  getSymptomsPaginated(){
    this.appService.getSymptomsPaginated(this.subpartId, this.currentPage, this.maxSize).subscribe(data =>{
      this.symptoms = data['symptoms'];
    })
  }

  displayForm(){
    this.showForm = true;
  }
  hideForm(){
    this.showForm = false;
  }

  updateSymptomList(id:string){
    if(this.symptomIdList.includes(id)) {
      this.symptomIdList.splice(this.symptomIdList.indexOf(id), 1);
    }
    else {
      this.symptomIdList.push(id);
    }

    console.log(this.symptomIdList);
  }

  setPage(pageNumber: number): void {
  this.currentPage = pageNumber;
  this.getSymptomsPaginated();
}

inList(id:string){
  if(this.symptomIdList.indexOf(id) > -1){
    return true;
  }
    return false;


}

onSubmit(){
  let token = localStorage.getItem('access_token');
  let jwtHelper = new JwtHelperService();
  let decodedToken = jwtHelper.decodeToken(token);

  let body = JSON.stringify({
    "symptom_ids": this.symptomIdList,
    "subpart_id": this.subpartId,
    "user_id": decodedToken.identity
  })

  this.appService.processResults(body).subscribe(data => {
      this.auth.refresh_token();
      this.router.navigateByUrl('/results');
  })


}




}
