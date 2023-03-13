const taskModel = require('../models/taskModel')

async function createTask(req, res) {
    try {
        const data = req.body
        const createdTask = await taskModel.create(data)
        return res.status(201).send(createdTask)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function getTasks(req, res) {
    try {
        const userId = req.params.userId
        const taskData = await taskModel.find({ userId, status: "pending", delete: false })
        return res.status(200).send(taskData)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function getCompletedTasks(req, res) {
    try {
        const userId = req.params.userId
        const taskData = await taskModel.find({ userId, status: "completed", delete: false })
        return res.status(200).send(taskData)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function getTaskBySort(req, res) {
    try {
        const sortBy = req.params.sortBy
        const userId = req.params.userId
        let taskData
        if (sortBy == "due_date") {
            taskData = await taskModel.find({ userId, status: "pending", delete: false }).sort({ dueDate: 1 })
        }
        else {
            taskData = await taskModel.find({ userId, status: "pending", delete: false }).sort({ createdAt: 1 })
        }
        return res.status(200).send(taskData)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function getTaskBySortCom(req, res) {
    try {
        const sortBy = req.params.sortBy
        const userId = req.params.userId
        let taskData
        if (sortBy == "due_date") {
            taskData = await taskModel.find({ userId, status: "completed", delete: false }).sort({ dueDate: 1 })
        }
        else {
            taskData = await taskModel.find({ userId, status: "completed", delete: false }).sort({ createdAt: 1 })
        }
        return res.status(200).send(taskData)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function getTaskById(req, res) {
    try {
        const Id = req.params.Id
        const taskData = await taskModel.findById({ _id: Id, status: "pending", delete: false })
        return res.status(200).send(taskData)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function updateTask(req, res) {
    try {
        const data = req.body
        const id = req.params.taskId

        const updatedTask = await taskModel.findOneAndUpdate({ _id: id, status: "pending", delete: false }, { $set: data }, { new: true })
        return res.status(200).send(updatedTask)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function updateStatus(req, res) {
    try {
        const id = req.params.taskId

        const updatedTask = await taskModel.findOneAndUpdate({ _id: id, status: "pending", delete: false }, { status: "completed" }, { new: true })
        return res.status(200).send(updatedTask)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function deleteTask(req, res) {
    try {
        const id = req.params.taskId
        await taskModel.findOneAndUpdate({ _id: id, delete: false }, { delete: true }, { new: true })
        return res.status(200).send({ msg: "deleted sucessfully" })
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

module.exports = { createTask, getTasks, getCompletedTasks, getTaskBySortCom, getTaskBySort, getTaskById, updateStatus, updateTask, deleteTask }