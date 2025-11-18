

# 📝 TaskCLI

Un gestionnaire de tâches en **ligne de commande** développé en **TypeScript**, avec **CRUD complet**, décorateurs, persistance JSON et tests unitaires.

---

## 🚀 Fonctionnalités principales

| Fonctionnalité              | Description                                                                  |
| --------------------------- | ---------------------------------------------------------------------------- |
| **Créer une tâche**         | Ajouter une tâche avec titre, status et priorité.                            |
| **Lister les tâches**       | Voir toutes les tâches ou filtrer par status / ID.                           |
| **Mettre à jour une tâche** | Modifier le titre, le status ou la priorité.                                 |
| **Supprimer une tâche**     | Retirer une tâche par son ID.                                                |
| **Décorateurs**             | `@timestamp` pour la date de création, `@validate` pour valider les données. |
| **Persistance**             | Stockage automatique des données dans des fichiers JSON.                     |
| **Tests unitaires**         | Couverture > 70% avec Vitest.                                                |

---

## 📦 Installation

```bash
# Cloner le projet
git clone <ton_repo_git>

# Installer les dépendances
npm install

# Compiler TypeScript
npm run build

# Lier le CLI localement
npm link
```

> Après `npm link`, la commande `taskcli` sera disponible globalement sur votre machine.

---

## 💻 Utilisation

### Ajouter une tâche

```bash
taskcli add "Titre de la tâche" [status] [priority]
```

* **status** (optionnel) : `pending`, `in-progress`, `completed` (défaut : `pending`)
* **priority** (optionnel) : `low`, `medium`, `high` (défaut : `medium`)

**Exemple :**

```bash
taskcli add "Apprendre TypeScript" pending high
```

---

### Lister les tâches

```bash
taskcli list
taskcli list pending        # filtre par status
taskcli list 3              # filtre par ID
```

* Affiche toutes les tâches si aucun filtre n’est fourni.

**Exemple :**

```bash
taskcli list completed
```

---

### Mettre à jour une tâche

```bash
taskcli update <id> [options]
```

**Options disponibles :**

| Option       | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `--title`    | Nouveau titre de la tâche                                  |
| `--status`   | Modifier le status (`pending`, `in-progress`, `completed`) |
| `--priority` | Modifier la priorité (`low`, `medium`, `high`)             |

**Exemple :**

```bash
taskcli update 1 --title "Nouvelle tâche" --status completed --priority high
```

---

### Supprimer une tâche

```bash
taskcli delete <id>
```

**Exemple :**

```bash
taskcli delete 2
```

---

## 🗂️ Architecture du projet

```
src/
├─ models/       # Gestionnaires de tâches (TaskManager)
├─ utils/        # DataStore, décorateurs, fonctions utilitaires
├─ types/        # Types TypeScript (Task, Status, etc.)
├─ data/         # Fichiers JSON de stockage
└─ test/         # Tests unitaires Vitest
```

* **DataStore** : lecture/écriture JSON avec création automatique de fichiers.
* **TaskManager** : CRUD complet avec validation et timestamp.
* **Decorators** : `@timestamp` et `@validate` pour automatiser la logique métier.

---

## 🧪 Tests

```bash
npm run test
```

* Tests unitaires pour toutes les fonctionnalités.
* Fichier principal : `src/test/TaskManager.test.ts`.
* Vérifie la création, la liste, la mise à jour et la suppression des tâches.
* Couverture minimum : 70%.

---

## 📌 Contribution

1. Forker le projet
2. Créer une branche `feature/nom-fonctionnalité`
3. Commit et push
4. Créer une Pull Request

---

## 📄 Licence

MIT License © 2025 Johnny Sassiat

