import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks');
      res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: 1,
        title,
        description,
        createdAt: new Date(),
        completedAt: null,
        updatedAt: null,
      };

      database.insert('tasks', task);
      res.writeHead(201).end();
    },
  },
];
