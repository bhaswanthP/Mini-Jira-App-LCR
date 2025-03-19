const express = require('express');
const app = express();

app.use(express.json());

const tasks = [
    {
        id: 1,
        title: 'Fix a critical bug',
        project: 'Project Alpha',
        assignedTo: 'Bob',
        priority: 'high',
        status: 'open'
    },
    {
        id: 2,
        title: 'Implement a new feature',
        project: 'Project Alpha',
        assignedTo: 'Charlie',
        priority: 'medium',
        status: 'in progress'
    },
    {
        id: 3,
        title: 'Write documentation',
        project: 'Project Beta',
        assignedTo: 'Bob',
        priority: 'low',
        status: 'open'
    }
];

// API to get the tasks by project name
app.get('/projects/:name/tasks', (req, res) => {
    const { name } = req.params;
    const projectTasks = tasks.filter(task => task.project === name);
    if (projectTasks.length === 0) {
        res.status(404).json({ message: 'No tasks found for this project' });
    }
    res.status(200).json(projectTasks);
});

// API to sort tasks by priority (high > medium > low)
app.get('/tasks/sort/by-priority', (req, res) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const sortedTasks = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    res.json(sortedTasks);
});

// API to add a new task
app.post('/tasks', (req, res) => {
    const { title, project, assignedTo, priority, status } = req.body;
    if (!title || !project || !assignedTo || !priority || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newId = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    const newTask = { id: newId, title, project, assignedTo, priority, status };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

const PORT = 3010;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
