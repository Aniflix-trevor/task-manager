import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TasksRoutingModule } from "./tasks-routing.module";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { TaskListPageComponent } from "./pages/task-list-page/task-list-page.component";
import { TaskCreatePageComponent } from "./pages/task-create-page/task-create-page.component";
import { TaskEditPageComponent } from "./pages/task-edit-page/task-edit-page.component";

@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent,
    TaskListPageComponent,
    TaskCreatePageComponent,
    TaskEditPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TasksRoutingModule,
  ],
  exports: [],
})
export class TasksModule {}
