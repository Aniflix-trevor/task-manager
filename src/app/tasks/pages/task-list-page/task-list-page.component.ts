import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith } from 'rxjs/operators';
import { Task, TaskStatus } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";

@Component({
  selector: "app-task-list-page",
  template: `
    <div class="card">
      <div class="controls">
        <select [formControl]="statusControl">
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input [formControl]="searchControl" placeholder="Search by title" />
        <a routerLink="/tasks/new"><button class="btn-primary">New Task</button></a>
      </div>
    </div>

    <app-task-list [tasks$]="filtered$"></app-task-list>
  `,
})
export class TaskListPageComponent implements OnInit {
  // Use non-nullable FormControls so valueChanges emits concrete types (no null)
  statusControl = new FormControl<"all" | TaskStatus>("all", { nonNullable: true });
  searchControl = new FormControl<string>("", { nonNullable: true });

  filtered$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Delegate filtering logic to TaskService
    this.filtered$ = this.taskService.filteredTasks(
      this.statusControl.valueChanges.pipe(startWith(this.statusControl.value ?? 'all')),
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value ?? ''))
    );
  }
}
