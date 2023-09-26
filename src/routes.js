import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/buildRoutePath.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'title is required',
          })
        );
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'description is required',
          })
        );
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: null,
      };

      database.insert('tasks', task);
      res.writeHead(201).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('tasks', id);
      res.writeHead(204).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'title or description is required',
          })
        );
      }

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      database.update('tasks', id, { title, description });
      res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      database.complete('tasks', id);
      res.writeHead(204).end();
    },
  },
];
