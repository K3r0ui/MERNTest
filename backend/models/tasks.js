const mongoose = require("mongoose")

const Schema = mongoose.Schema

const taskSchema = new Schema(  {
    title: {
      type: String,
      required: [true, "enter a valid title"]
    },
    description: {
      type: String,
      max: 300
    },
    finished: {
      type:Boolean,
    },
    finished_at: {
        type:Date,
        default:null
    },
    updated_at:{
        type:Date,
        default:null
    }
  },
  { timestamps: { createdAt: 'created_at' , updatedAt : false }}
)
module.exports = mongoose.model("Task",taskSchema)