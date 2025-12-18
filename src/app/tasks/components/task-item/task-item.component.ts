import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Task } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";

@Component({
  selector: "app-task-item",
  template: `
    <div class="task-row card">
      <div class="task-meta">
        <div>
          <div class="title">{{ task.title }}</div>
          <div class="muted">{{ task.description }}</div>
        </div>
        <div>
          <span
            class="badge"
            [ngClass]="
              task.status === 'todo'
                ? 'todo'
                : task.status === 'in-progress'
                ? 'in-progress'
                : 'done'
            "
            >{{ task.status }}</span
          >
        </div>
      </div>
      <div class="actions">
        <button (click)="onEdit()">Edit</button>
        <button (click)="onDelete()">Delete</button>
      </div>
    </div>
  `,
})
export class TaskItemComponent {
  @Input() task!: Task;

  constructor(private router: Router, private taskService: TaskService) {}

  onEdit() {
    this.router.navigate(["/tasks", this.task.id, "edit"]);
  }

  onDelete() {
    if (confirm("Delete this task?")) {
      this.taskService.delete(this.task.id);
    }
  }
}
