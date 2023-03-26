import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm:any;
  constructor(
    private FormBuilder: FormBuilder
  ){ }

ngOnInIt():void{
  this.signupForm = this.FormBuilder.group({
    "firstName":['',[Validators.required,Validators.maxLength(30)]],
    "lastName":['',[Validators.required,Validators.maxLength(30)]],
    "gender":['',[Validators.required,Validators.maxLength(30)]],
    "dob":['',[Validators.required,Validators.maxLength(30)]],
    "email":['',[Validators.required,Validators.maxLength(30)]],
    "contactNo":['',[Validators.required,Validators.maxLength(30)]],
    "password":['',[Validators.required,Validators.maxLength(30)]],
    "confirmPassword":['',[Validators.required,Validators.maxLength(30)]]

  })
}

get firstName(){
  return this.signupForm.get("firstName")
}
get lastName(){
  return this.signupForm.get("lastName")
}
}
