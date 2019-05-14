import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Task } from '../../models/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [DatePipe]
})
export class TaskComponent implements OnInit {

  constructor(private datePipe: DatePipe, private taskService: TaskService, private authenticationService: AuthenticationService) {
    this.reset();
  }

  taskForm: FormGroup;

  message: String;

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getTasks().subscribe();
  }

  reset() {
    this.taskForm = new FormGroup({
      _id: new FormControl(null),
      title: new FormControl(null, Validators.required),
      details: new FormControl(null),
      dueDate: new FormControl(null, Validators.required)
    });
    this.message = '';
  }

  addUpdateTask() {
    if(this.taskForm.value._id == null) {
      this.taskService.addTask(this.taskForm.value).subscribe(result => {
        this.message = result.message;
        this.getTasks();
      }, error => {
        this.message = error.error.message;
      })
    } else {
      this.taskService.updateTask(this.taskForm.value._id, this.taskForm.value).subscribe(result => {
        this.message = result.message;
        this.getTasks();
      }, error => {
        this.message = error.error.message;
      })
    }
  }

  showEdit(task: Task) {
    this.taskForm = new FormGroup({
      _id: new FormControl(task._id),
      title: new FormControl(task.title, Validators.required),
      details: new FormControl(task.details),
      dueDate: new FormControl(task.dueDate, Validators.required)
    });
    this.message = '';
  }

  completeTask(task: Task) {
    var date = new Date();
    task.completedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.taskService.updateTask(task._id, task).subscribe(result => {
      this.message = result.message;
      this.getTasks();
    }) 
  }

}
