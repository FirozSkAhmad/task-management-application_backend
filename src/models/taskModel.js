const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: "pending"
        },
        delete: {
            type: Boolean,
            default: false
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly"],
            default: "daily"
        },
        date: {
            type: String,
            default:"1"
        },
        day: {
            type: String,
            default:"monday"
        },
        time: {
            type: String,
            default: "12"
        },
        meridiem: {
            type: String,
            enum: ["am", "pm"],
            default: "pm"
        },
        typeOfN: {
            type: String,
            enum: ["email", "SMS", "push"],
            default: "email"
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('task', taskSchema)