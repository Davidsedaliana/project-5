import { Component, Output,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, UrlSegment } from '@angular/router';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { user } from '../models/user_interface';
@Component({
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  form!:FormGroup
  constructor(private route:Router, public fb:FormBuilder,private requestService:RequestService){
    
  }
  error:boolean=false
  data:any
  data2:user[]=[]
  ngOnInit(): void {
    this.form=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(2)]]
    })

  }
  roles:string[]=['admin','editor']
  selectedRole:string=''
  randomNum(min:number,max:number){
    return Math.floor(Math.random() * (min - max + 1) + min)
  }
onSubmit(data:string){
this.requestService.postlog(data).subscribe((res)=>{
  localStorage.setItem('token',res.token)
},(error)=>{
  this.error=true
  setTimeout(() => {
  this.error=false
  }, 5000);
})
this.requestService.getData<user[]>(environment.users.get).subscribe(result=>{
  const editUser:user={
    email: this.data2[0].email,
    first_name: this.data2[0].first_name,
    last_name: this.data2[0].last_name,
    phone: this.data2[0].phone,
    url: this.data2[0].url,
    id:0,
    role: this.roles[this.randomNum(0,1)]
  }
  ;
  
  this.requestService.put<user>(`${environment.users.get}/${0}`,editUser).subscribe(result=>{
    console.log(result);
    
  })
})



this.route.navigate(['profile'])
}

}
