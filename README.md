# Task Manager (Angular)

This is a small Angular frontend app demonstrating a Task Manager built with best practices:

- Angular (latest stable series)
- TypeScript
- Router with feature module for tasks
- Reactive Forms only
- RxJS with BehaviorSubject for state
- Persistence via localStorage

Folder layout (key files):

app/
core/
models/task.model.ts
services/task.service.ts
tasks/ (feature module)
components/
task-list/, task-item/, task-form/
pages/
task-list-page/, task-create-page/, task-edit-page/
app-routing.module.ts

How to run (local machine):

1. Install dependencies

```bash
cd task-manager
npm install
```

2. Run the dev server

```bash
npm start
# or
ng serve
```

Notes and decisions:

- All business logic (CRUD, filtering, persistence) is contained in `TaskService`.
- State is managed with `BehaviorSubject<Task[]>` and exposed as `tasks$`.
- Components use the async pipe to subscribe where possible.
- The `filteredTasks` helper in `TaskService` accepts observables for status and search, keeping filtering logic in the service.

If you want, I can add unit tests and a CI config next.
