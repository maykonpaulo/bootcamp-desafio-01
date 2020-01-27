const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

let countReqs = 0;

server.use((req, res, next) => {
  countReqs++;

  console.log(countReqs);

  return next();
})

function checkIdExists(req, res, next) {
  const { id } = req.params;

  if (!projects.find((project) => project.id == id))
    return res.status(400).json({ error: 'Id não encontrado' });

  return next();
}

server.get('/projects', (req, res) => {
  res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = { id, title, tasks: [] };

  projects.push(project);

  res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find((project) => project.id == id);

  project.tasks.push(tasks);

  res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find((project) => project.id == id);

  project.title = title;

  res.json(projects);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((project) => project.id == id);

  projects.splice(index, 1);

  res.send();

});

server.listen(3000);