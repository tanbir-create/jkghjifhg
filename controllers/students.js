const { Student, validateStudent } = require('../models/student');
// const _ = require('lodash')

module.exports.addNew = async ( req, res ) => {

    const {error} = validateStudent(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message })

    try {

        let { name, college, month, year, dsa, webD, react } = req.body;
        
        // let student = new Student(_.pick(req.body, ['name', 'college', 'batch', 'courseScores']))

        let student = new Student({
            name,
            college,
            batch: {
                month,
                year 
            },
            courseScores: {
                dsa,
                webD,
                react
            }
        })
       
        await student.save();

        return res.status(201).json({ 
            message: "New student added",
            student })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }

} 