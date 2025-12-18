import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TaskService } from "../../../core/services/task.service";

@Component({
  selector: "app-task-create-page",
  template: `
    <h2>Create Task</h2>
    <app-task-form
      (saved)="onSave($event)"
      (cancel)="onCancel()"
    ></app-task-form>
  `,
})
export class TaskCreatePageComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  onSave(payload: any) {
    this.taskService.create(payload);
    this.router.navigate(["/tasks"]);
  }

  onCancel() {
    this.router.navigate(["/tasks"]);
  }
}
