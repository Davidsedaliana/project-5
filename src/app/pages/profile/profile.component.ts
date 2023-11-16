import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../app/services/request.service';
import { environment } from '../../../../environment/environment';
import { user } from '../../../../src/app/models/user_interface';
import { HeaderComponent } from '../../header and footer/header/header.component';
import{MatIconModule} from '@angular/material/icon'
@Component({
  standalone:true,
  imports:[CommonModule,RouterLink,RouterModule,RouterOutlet,ReactiveFormsModule,MatIconModule],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{


constructor(private requestService:RequestService,public fb:FormBuilder) {
  
}






form!:FormGroup
sucsess:boolean=false

id!:number
email!:string
name!:string
lname!:string
phone!:string
url!:string
data:user[]=[]
type:boolean=false
edit(el:user,id:number){
this.form.enable()
this.id=id
this.email=el.email
this.name=el.first_name
this.lname=el.last_name
this.phone=el.phone
console.log(this.phone);

this.url=el.url
this.type=!this.type
}
dataGet(){
  this.requestService.getData<user[]>(environment.users.get).subscribe(current=>{
    this.data=current
    this.innitForm()
  })

}
exit(){
  this.form.disable()
}
ngOnInit(): void {
this.dataGet()
}
innitForm(){
  this.form=this.fb.group({
    name:[this.data[0].first_name,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
    lname:[this.data[0].last_name,[Validators.required,Validators.maxLength(255),Validators.minLength(2)]],
    phone:[this.data[0].phone.slice(2,12),[Validators.required,Validators.maxLength(10),Validators.minLength(9)]],
    url:[this.data[0].url,Validators.required]
  })
  this.form.disable()

  
}
error:boolean=false
input=document.getElementsByTagName('input')
isSubmitted=false
onSubmit(){
  this.form.disable()

  const editUser:user = {
    email: this.data[0].email,
    first_name: this.input[1].value,
    last_name: this.input[2].value,
    phone: '+7'+this.input[3].value,
    url: this.input[4].value,
    id:0,
    role:''
  }

  this.requestService.put<user>(`${environment.users.get}/${this.id}`,editUser).subscribe((result)=>{
    console.log(result);
    
this.dataGet()
this.type=!this.type
this.sucsess=true
  setTimeout(() => {
    this.sucsess=false
  
    }, 30000);
  },error=>{
  this.error=true    
  
    
  })
  if(this.form.get('name')?.hasError('minlength')){
  this.error=true    

  }
}
close(){
  this.error=false
}
}
