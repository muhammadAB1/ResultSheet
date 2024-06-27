import mongoose from "mongoose";
import { Student } from "./Student.js";
import { Mark } from "./Mark.js";
import { Grade } from "./Grade.js";
import { Head } from "./Head.js";
(async () => {
    await mongoose.connect("mongodb+srv://muhammad:Digimon03.@cluster0.dek5f6q.mongodb.net/recapsheet?retryWrites=true&w=majority&appName=Cluster0"); 
})();

export const db = {
    Student,
    Mark,
    Grade,
    Head,
};
