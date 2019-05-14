import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthenticationService } from './services/authentication.service';
import { TaskService } from './services/task.service';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  { path: '', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, AuthGuard, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
