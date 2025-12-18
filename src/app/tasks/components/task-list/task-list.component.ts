import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../../../core/models/task.model";

@Component({
  selector: "app-task-list",
  template: `
    <div class="tasks-grid">
      <ng-container *ngIf="tasks$ | async as tasks">
        <div *ngIf="tasks.length === 0" class="card muted">No tasks yet.</div>
        <app-task-item *ngFor="let task of tasks" [task]="task"></app-task-item>
      </ng-container>
    </div>
  `,
})
export class TaskListComponent {
  @Input() tasks$!: Observable<Task[]>;
}
