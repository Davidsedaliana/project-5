import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { environment } from '../../../../environment/environment';
import { user } from '../../models/user_interface';
@Component({

  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent {

  constructor(private requestService:RequestService) {
    
  }
  data:user[]=[]
  upCase(data:boolean){

  }
  authorsGet(){
    this.requestService.getData<user[]>(environment.users.get).subscribe(current=>{
      this.data=current
    })
  }
ngOnInit(): void {
this.authorsGet()
}

}
