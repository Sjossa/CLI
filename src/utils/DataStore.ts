import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import Task from "../types/TaskTypes";


export class DataStore<T extends Task > {
  private filePath: string;

  constructor(filename = "src/data/tasks.json") {
    this.filePath = join(__dirname, "../../", filename);
    this.checkFile();
  }

  private checkFile() {
    const folder = dirname(this.filePath);

    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }

    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, "[]", "utf8");
    } else {
    }
  }

  public read(): T[] {
    try {
      this.checkFile();

      const rawData = readFileSync(this.filePath, "utf8");

      if (!rawData.trim()) return [];

      const data: unknown = JSON.parse(rawData);

      if (Array.isArray(data)) {
        return data as T[];
      } else {
        console.warn("Le JSON n'est pas un tableau, renvoi d'un tableau vide");
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier JSON :", error);
      return [];
    }
  }



  public create(item: Omit<T, "id">): T {
    const items = this.read();
    const newItem: T = {
      ...item,
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    } as T;

    items.push(newItem);
    writeFileSync(this.filePath, JSON.stringify(items, null, 2), "utf8");
    return newItem;
  }

  public delete(id: number): boolean {
  const items = this.read();
  const newItems = items.filter(item => item.id !== id);

  if (newItems.length === items.length) {
    return false; // rien supprimé
  }

  writeFileSync(this.filePath, JSON.stringify(newItems, null, 2), "utf8");
  return true;
}

public update(id: number, updates: Partial<T>): T | undefined {
  const items = this.read();
  const index = items.findIndex(item => item.id === id);

  if (index === -1) return undefined;

  const updatedItem: T = {
    ...items[index],
    ...updates,
  }as T ;

  items[index] = updatedItem;

  writeFileSync(this.filePath, JSON.stringify(items, null, 2), "utf8");

  return updatedItem;
}


    }


