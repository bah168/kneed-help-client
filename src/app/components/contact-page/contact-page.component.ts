import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  contactUsForm: FormGroup;
  name:string;
  email:string;
  message: string;

  constructor(private fb: FormBuilder,
              protected appService: AppService,
              protected alertService: AlertService) { }

              //Alert messages used on this component
            success(message: string) { this.alertService.success(message); }
            error(message: string) { this.alertService.error(message); }
            warn(message: string) { this.alertService.warn(message); }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.contactUsForm = this.fb.group({
      'name': [this.name, [Validators.required,]],
      'email': [this.email,[Validators.required, Validators.email, ]],
      'message': [this.message, [Validators.required,]]
    });

    this.contactUsForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }


  onValueChanged(data?: any) {

      if ( !this.contactUsForm ) {
          return;
      }

      const form = this.contactUsForm;

      for ( const field in this.formErrors ) {
          //clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);

        if ( control && control.dirty && !control.valid ) {

            const messages = this.validationMessages[field];

            for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
            }
        }
      }
  }


  onSubmit(){
  let body = JSON.stringify({ 'name': this.contactUsForm.value.name,
                              'email': this.contactUsForm.value.email,
                              'message': this.contactUsForm.value.message
                            })
  this.appService.contactUs(body).subscribe(data => {
    this.alertService.clear();
    this.success('Message was successfully sent.');
    this.contactUsForm.reset();
  },
  error => {
    this.alertService.clear();
    this.error(error.message);
    this.contactUsForm.reset();
  });
  }

    formErrors = {
        'name': '',
        'email': '',
        'message': ''
    };

    //Validation messages for the add-item-form
    validationMessages = {
        'name': {
          'required': 'Name is required.'
        },
        'email': {
          'required': 'Email is required.',
          'email': 'Please enter a valid email.'
        },
        'message': {
          'required': 'A message is required'
        }
    };
    active = true;
}
