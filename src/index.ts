import TaskManager from "./models/TaskManagers";
import Task from "./types/TaskTypes";
const TaskManagers = new TaskManager();
const argv = process.argv;
const command = argv[2];

if (command === "add") {
  const title = argv[3] || "Untitled Task";
  const status =
    (argv[4] as "pending" | "in-progress" | "completed") || "pending";
  const priority = (argv[5] as "low" | "medium" | "high") || "low";
  TaskManagers.CreateTask(title, priority);
} else if (command === "list") {
  const arg = argv[3];

  const statuses = ["pending", "in-progress", "completed"] as const;

  if (statuses.includes(arg as any)) {
    TaskManagers.listTasks(arg as "pending" | "in-progress" | "completed");
  } else if (!isNaN(Number(arg))) {
    TaskManagers.listTasks(undefined, Number(arg));
  } else {
    TaskManagers.listTasks();
  }
} else if (command === "delete") {
  const id = argv[3];
  if (id) {
    TaskManagers.deleteTask(parseInt(id, 10));
  } else {
    console.log("erreur.");
  }
} else if (command === "update") {
  const idArg = argv[3];
  if (!idArg || isNaN(Number(idArg))) {
    console.log("Veuillez fournir un ID valide pour la mise à jour.");
  } else {
    const id = Number(idArg);
    const updates: Partial<Omit<Task, "id">> = {};

    if (argv[4]) updates.title = argv[4];
    if (argv[5]) {
      const statuses = ["pending", "in-progress", "completed"] as const;
      if (statuses.includes(argv[5] as any)) updates.status = argv[5] as any;
    }
    if (argv[6]) {
      const priorities = ["low", "medium", "high"] as const;
      if (priorities.includes(argv[6] as any))
        updates.priority = argv[6] as any;
    }

    const updatedTask = TaskManagers.Update(id, updates);

    if (!updatedTask) {
      console.log(`Impossible de mettre à jour la tâche avec l'ID ${id}.`);
    } else {
      console.log("Tâche mise à jour :", updatedTask);
    }
  }
}
