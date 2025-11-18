import { beforeEach, describe, expect, test } from "vitest";
import TaskManager from "../models/TaskManagers";
import Task from "../types/TaskTypes";
import { DataStore } from "../utils/DataStore";

const TEST_FILE = "src/data/tasks.test.json";

describe("TaskManager", () => {
  let manager: TaskManager;

  beforeEach(() => {
    // Supprimer le fichier de test pour partir à zéro
    const fs = require("fs");
    if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);

    manager = new TaskManager();
    // On force l'utilisation d'un fichier de test
    (manager as any).DataStore = new DataStore<Task>(TEST_FILE);
  });

  test("CreateTask ajoute une tâche avec titre et priorité", () => {
    const task = manager.CreateTask("Ma tâche", "medium");

    expect(task.id).toBe(1);
    expect(task.title).toBe("Ma tâche");
    expect(task.status).toBe("pending");
    expect(task.priority).toBe("medium");
    expect(task.createdAt).toBeDefined();
  });

  test("listTasks retourne toutes les tâches", () => {
    manager.CreateTask("Tâche 1");
    manager.CreateTask("Tâche 2", "high");

    const tasks = manager.listTasks();
    expect(tasks.length).toBe(2);
  });

  test("listTasks peut filtrer par status", () => {
    manager.CreateTask("Tâche 1");
    manager.CreateTask("Tâche 2", "medium");

    const pending = manager.listTasks("pending");
    expect(pending.length).toBe(2);

    // On change le status d'une tâche
    manager.Update(1, { status: "completed" });
    const completed = manager.listTasks("completed");
    expect(completed.length).toBe(1);
    expect(completed[0]!.id).toBe(1);
  });

  test("deleteTask supprime la tâche et retourne true", () => {
    manager.CreateTask("Tâche 1");
    manager.CreateTask("Tâche 2");

    const deleted = manager.deleteTask(1);
    expect(deleted).toBe(true);

    const tasks = manager.listTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]!.id).toBe(2);
  });

  test("deleteTask retourne false si id inexistant", () => {
    const deleted = manager.deleteTask(999);
    expect(deleted).toBe(false);
  });

  test("Update modifie correctement une tâche existante", () => {
    manager.CreateTask("Tâche 1", "low");

    const updated = manager.Update(1, {
      title: "Nouvelle Tâche",
      priority: "high",
      status: "in-progress",
    });

    expect(updated).toBeDefined();
    expect(updated!.title).toBe("Nouvelle Tâche");
    expect(updated!.priority).toBe("high");
    expect(updated!.status).toBe("in-progress");

    // Vérifier que listTasks reflète la modification
    const taskFromList = manager.listTasks("in-progress")[0]!;
    expect(taskFromList).toBeDefined();
    if (taskFromList) {
      expect(taskFromList.id).toBe(1);
    }
  });

  test("Update retourne null si id inexistant", () => {
    const result = manager.Update(999, { title: "Non existante" });
    expect(result).toBeNull();
  });
});
