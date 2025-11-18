import Task from "../types/TaskTypes";
import { DataStore } from "../utils/DataStore";
import { timestamp, validate } from "../utils/Decorators";

class TaskManagers {
  private DataStore: DataStore<Task>;

  constructor() {
    this.DataStore = new DataStore();
  }

  @validate
  @timestamp
  public CreateTask(
    title: string,
    priority: "low" | "medium" | "high" = "medium",
  ) {
    const newTask = this.DataStore.create({
      title,
      status: "pending",
      priority,
      createdAt: new Date().toISOString(),
    });

    return newTask;
  }

  public listTasks(
    status?: "pending" | "in-progress" | "completed",
    id?: number,
  ) {
    const tasks = this.DataStore.read();
    let filteredTasks: Task[];

    if (status) {
      filteredTasks = tasks.filter((task) => task.status === status);
    } else if (id) {
      filteredTasks = tasks.filter((task) => task.id === id);
    } else {
      filteredTasks = tasks;
    }

    console.log(filteredTasks);
    return filteredTasks;
  }

  public deleteTask(id: number) {
    const deleted = this.DataStore.delete(id);

    if (!deleted) {
      console.log(`Aucune tâche trouvée avec l'id ${id}`);
    } else {
      console.log(`Tâche ${id} supprimée.`);
    }

    return deleted;
  }

  public Update(id: number, updates: Partial<Omit<Task, "id">>) {
    const updated = this.DataStore.update(id, updates);

    if (!updated) {
      console.log(`Aucune tâche trouvée avec l'id ${id}`);
      return null;
    }

    console.log(`Tâche ${id} mise à jour :`, updated);
    return updated;
  }
}

export default TaskManagers;
