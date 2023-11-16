import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { user } from '../../../app/models/user_interface';
import { RequestService } from '../../services/request.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private requestService:RequestService, private route:Router) {
    
  }

  sucsess1=false
  sucsess(bool:boolean){
    if(bool){
      this.sucsess1=true
    }
  }

  data:user[]=[]
  authorsGet(){
    this.requestService.getData<user[]>(environment.users.get).subscribe(current=>{
      this.data=current
    })
  }
ngOnInit(): void {
this.authorsGet()
}
logout(){
  if(confirm('Вы хотите выйти?'))
  localStorage.removeItem('token')
  this.route.navigate(['auth'])
}
}
