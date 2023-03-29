const fs = require('fs/promises');
require('dotenv').config();

const dataFilePath = process.env.DATA_FILE_PATH;

// Helper function to read data from the file
async function readData() {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
}

// Helper function to write data to the file
async function writeData(data) {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}


// Define the Controller
const todoController = {
    async getById(req, res) {
        const data = await readData();
        const todo = data.find((t) => t.id === req.params.id);

        if (!todo) {
            return res.status(404).send({ message: "Todo not found" });
        }

        res.send(todo);
    },

    async index(req, res) {
        let todos = await readData();
        todos = todos.map(todo => {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        });

        res.send(todos);
    },

    async create(req, res) {
        const data = await readData();

        const newTodo = {
            id: `${data.length + 1}`,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed || false,
        };

        data.push(newTodo);

        await writeData(data);

        res.status(201).send(newTodo);
    },

    async update(req, res) {
        const data = await readData();

        const todo = data.find((t) => t.id === req.params.id);

        if (!todo) {
            return res.status(404).send({ message: "Todo not found" });
        }

        todo.title = req.body.title || todo.title;

        todo.description = req.body.description || todo.description;

        todo.completed = req.body.completed || todo.completed;;

        await writeData(data);

        res.send(todo);
    },

    async delete(req, res) {
        const data = await readData();

        const index = data.findIndex((t) => t.id === req.params.id);

        if (index === -1) {
            return res.status(404).send({ message: "Todo not found" });
        }

        const deleted = data.splice(index, 1)[0];

        await writeData(data);

        res.send(deleted);
    },

    async deleteAll(req, res) {
        try {
            // Read existing todos from the file
            const todos = await readData();

            // Clear the file by writing an empty array
            await writeData([]);

            res.send({
                message: `Deleted ${todos.length} todos`,
                data: todos,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Failed to delete todos' });
        }
    }
};

module.exports = todoController;