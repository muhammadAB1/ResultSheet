import express from 'express'
const router = express.Router();
import { db } from "../models/index.js"



router.post('/students', async (req, res) => {
    try {
        const _marks = req.body;
        console.log(_marks);

        for (let i = 0; i < _marks.length; i ++) {

            // let mark = _marks[i];
            // console.log(`mark!!!!!!!!!!!: ${mark}`);

            const mark = await db.Mark.findOneAndUpdate({ _id: _marks[i]._id }, _marks[i]);
            if (!mark) {
                console.log(`mark ${mark._id} not being updated!`);
            } else {
                console.log(`mark ${mark._id} updated!`);
            }
        }

        console.log(`Updated the marks!`);
        res.send('Marks updated successfully');
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

router.get('/all', async (req, res) => {
    const data = await db.Student.find()
    res.json(data)
})

// router.post('/students', async (req, res) => {
//     try {
//         const _marks = req.body;
//         console.log(_marks);

//         // for (let i = 0; i < _marks.length; i ++) {
//         //     const mark = _marks[i];
//         //     console.log(`mark!!!!!!!!!!!: ${mark}`);
//         // }
        
//         for (const { _id, mid, regno, hid, marks } in _marks) {

//             console.log(`_id: ${_id}, mid: ${mid}, regno: ${regno}, hid: ${hid}, marks: ${marks}`);

//             const mark = await db.Mark.findOneAndUpdate({ _id }, marks);
//             if (!mark) {
//                 console.log(`mark ${mark._id} not being updated!`);
//             } else {
//                 console.log(`mark ${mark._id} updated!`);
//             }
//         }

//         console.log(`Updated the marks!`);
//         res.send('Marks updated successfully');
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e.message);
//     }
// });

router.get('/students', async (req, res) => {
    // const students = await db.Student.find();
    
    // console.log(students);
    // console.log(heads);
    
    // const marks = await db.Mark.find();
    
    // res.json(marks);
    
    const heads = await db.Head.find();
    const grades = await db.Grade.find();
    const students = await db.Student.aggregate([
        { $lookup: { from: "marks", foreignField: "regno", localField: "regno", as: "obtain" } },
        { $unwind: "$obtain" },
        { $group: { _id: { regno: "$regno", name: "$name" }, total: { $sum: "$obtain.marks" } } },
        { $project: { _id: 0, regno: "$_id.regno", name: "$_id.name", total: { $round: ["$total", 0] } } },
        {
            $lookup: {
                from: "grades",
                let: { score: "$total" },
                pipeline: [{ $match: { $expr: { $and: [{ $gte: ["$$score", "$start"] }, { $lte: ["$$score", "$end"] }] } } }],
                as: "grade",
            },
        },
        { $unwind: "$grade" },
        { $project: { regno: 1, name: 1, total: 1, grade: "$grade.grade" } },
        {
            $lookup:
            {
                from: "marks",
                foreignField: "regno",
                localField: "regno",
                pipeline: [
                    {
                        $lookup: {
                            from: "heads",
                            localField: "hid",
                            foreignField: "hid",
                            as: "head",
                        },
                    },
                    {
                        $unwind: "$head"
                    }, 
                ],
                as: "marks"
            }
        }]);

    res.json({students, grades, heads});
});

export default router;