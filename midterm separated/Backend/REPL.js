// import { db } from "./models/index.js"


// db.Student.aggregate([
//     { $lookup: { from: "marks", foreignField: "regno", localField: "regno", as: "obtain" } },
//     { $unwind: "$obtain" },
//     { $group: { _id: { regno: "$regno", name: "$name" }, total: { $sum: "$obtain.marks" } } },
//     { $project: { _id: 0, regno: "$_id.regno", name: "$_id.name", total: { $round: ["$total", 0] } } },
//     {
//         $lookup: {
//             from: "grades",
//             let: { score: "$total" },
//             pipeline: [{ $match: { $expr: { $and: [{ $gte: ["$$score", "$start"] }, { $lte: ["$$score", "$end"] }] } } }],
//             as: "grade",
//         },
//     },
//     { $unwind: "$grade" },
//     { $project: { regno: 1, name: 1, total: 1, grade: "$grade.grade" } },
//     {
//         $lookup:
//         {
//             from: "marks",
//             foreignField: "regno",
//             localField: "regno",
//             pipeline: [
//                 {
//                     $lookup: {
//                         from: "heads",
//                         localField: "hid",
//                         foreignField: "hid",
//                         as: "head",
//                     },
//                 },
//                 {
//                     $unwind: "$head"
//                 }, 
//             ],
//             as: "marks"
//         }s
//     },
// ])
//     .then((res) => console.log(JSON.stringify(res, null, 4)))
//     .then(() => process.exit());
