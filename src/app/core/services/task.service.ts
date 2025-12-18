import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Task, TaskStatus } from "../models/task.model";

/**
 * TaskService holds all business logic related to tasks.
 * - Uses BehaviorSubject<Task[]> to manage state
 * - Persists to localStorage
 * - Exposes CRUD operations and filtered view helpers
 */
@Injectable({ providedIn: "root" })
export class TaskService {
  private storageKey = "task_manager_tasks_v1";
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // Public observable for components to subscribe (use async pipe)
  public tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.tasksSubject.value)
      );
    } catch (e) {
      console.error("Failed to save tasks to localStorage", e);
    }
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const tasks: Task[] = raw ? JSON.parse(raw) : [];
      this.tasksSubject.next(tasks);
    } catch (e) {
      console.warn("Failed to load tasks from localStorage", e);
      this.tasksSubject.next([]);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  /** Create a new task and persist */
  create(task: {
    title: string;
    description?: string;
    status?: TaskStatus;
  }): Task {
    const newTask: Task = {
      id: this.generateId(),
      title: task.title,
      description: task.description,
      status: task.status ?? "todo",
      createdAt: new Date().toISOString(),
    };
    const next = [...this.tasksSubject.value, newTask];
    this.tasksSubject.next(next);
    this.saveToStorage();
    return newTask;
  }

  /** Update an existing task; returns updated task or undefined */
  update(id: string, patch: Partial<Task>): Task | undefined {
    const list = this.tasksSubject.value.slice();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    const updated: Task = { ...list[idx], ...patch };
    list[idx] = updated;
    this.tasksSubject.next(list);
    this.saveToStorage();
    return updated;
  }

  /** Delete task by id */
  delete(id: string): void {
    const next = this.tasksSubject.value.filter((t) => t.id !== id);
    this.tasksSubject.next(next);
    this.saveToStorage();
  }

  /** Get a single task as observable */
  getById(id: string): Observable<Task | undefined> {
    return this.tasks$.pipe(map((list) => list.find((t) => t.id === id)));
  }

  /**
   * Return an observable of tasks filtered by status and search term.
   * All heavy-lifting/filtering logic stays inside the service (architecture rule).
   */
  filteredTasks(
    status$: Observable<TaskStatus | "all" | null>,
    search$: Observable<string>
  ): Observable<Task[]> {
    return combineLatest([this.tasks$, status$, search$]).pipe(
      map(([tasks, status, search]) => {
        const s = (search || "").trim().toLowerCase();
        return tasks
          .filter((t) => {
            const matchesStatus =
              !status || status === "all" ? true : t.status === status;
            const matchesSearch = !s ? true : t.title.toLowerCase().includes(s);
            return matchesStatus && matchesSearch;
          })
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      })
    );
  }
}
