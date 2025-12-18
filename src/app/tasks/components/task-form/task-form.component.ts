import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task, TaskStatus } from "../../../core/models/task.model";

@Component({
  selector: "app-task-form",
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="card">
      <div>
        <label>Title</label>
        <input formControlName="title" />
        <div
          *ngIf="form.controls.title.invalid && form.controls.title.touched"
          class="muted"
        >
          Title is required
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea formControlName="description"></textarea>
      </div>

      <div>
        <label>Status</label>
        <select formControlName="status">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div style="margin-top:12px" class="flex space-between">
        <div style="flex:1; display:flex; gap:8px;">
          <button type="submit" class="btn-primary" [disabled]="form.invalid">
            Save
          </button>
          <button type="button" (click)="cancel.emit()">Cancel</button>
        </div>
      </div>
    </form>
  `,
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task | null;
  @Output() saved = new EventEmitter<Partial<Task>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.task?.title ?? "", [Validators.required]],
      description: [this.task?.description ?? ""],
      status: [this.task?.status ?? ("todo" as TaskStatus)],
    });
  }

  submit() {
    if (this.form.valid) {
      this.saved.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
