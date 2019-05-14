import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskResponse } from '../models/TaskResponse';
import { Task } from '../models/task';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  taskList: Task[];

  getTasks() {
    return this.http.get<TaskResponse>('http://localhost:4000/task').map(data => {
      this.taskList = data.tasks;
    });
  }

  addTask(body) {
    return this.http.post<TaskResponse>('http://localhost:4000/task', body, this.getHeaders()).map(result => {
      return result;
    });
  }

  updateTask(id, body) {
    return this.http.patch<TaskResponse>('http://localhost:4000/task/' + id + '', body, this.getHeaders()).map(result => {
      return result;
    });
  }

  getHeaders() {
    const token = this.authenticationService.currentUserValue.token.toString();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

}
