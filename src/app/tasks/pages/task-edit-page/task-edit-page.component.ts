import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Task } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";

@Component({
  selector: "app-task-edit-page",
  template: `
    <div *ngIf="task">
      <h2>Edit Task</h2>
      <app-task-form
        [task]="task"
        (saved)="onSave($event)"
        (cancel)="onCancel()"
      ></app-task-form>
    </div>
    <div *ngIf="!task" class="muted">Loading task...</div>
  `,
})
export class TaskEditPageComponent implements OnInit, OnDestroy {
  task?: Task | null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") as string;
    this.taskService
      .getById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((t) => (this.task = t || null));
  }

  onSave(patch: Partial<Task>) {
    if (!this.task) return;
    this.taskService.update(this.task.id, patch);
    this.router.navigate(["/tasks"]);
  }

  onCancel() {
    this.router.navigate(["/tasks"]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
