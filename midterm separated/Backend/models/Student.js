import { model, Schema } from "mongoose"

const studentSchema = new Schema({
    regno: String,
    name: String,
    marks:[{
        type: Schema.Types.ObjectId,
        ref: 'Mark'
    }],
    head:[{
        type: Schema.Types.ObjectId,
        ref: 'Head'
    }],
});

export const Student = model("Student", studentSchema);
