import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header and footer/header/header.component';
import { FooterComponent } from './header and footer/footer/footer.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { Router, RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BillingComponent } from './pages/billing/billing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import{MatIconModule} from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { profileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    
    children:[
      
      {
        path: '',
        component: HomeComponent,
        title:'home'
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
      },
      {
        path:'inventory',
        loadComponent :()=>import('./pages/inventory/inventory.component').then(m=>m.InventoryComponent)
      },
      {
        path:'reports',
        loadComponent:()=>import('./pages/reports/reports.component').then(m=>m.ReportsComponent)
      },
      {
        path:'billing',
        loadComponent:()=>import('./pages/billing/billing.component').then(m=>m.BillingComponent)
      },
      {
        path:'auth',
        loadComponent: ()=>import('./auth/auth.component').then(m=>m.AuthComponent),

      },
      {
        path:'profile',
        loadComponent:()=>import('./pages/profile/profile.component').then(m=>m.ProfileComponent),
        canActivate:[profileGuard]

      },
    ]
  },

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterLink,
    RouterOutlet,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
