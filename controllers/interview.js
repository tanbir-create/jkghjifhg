const Interview = require('../models/interview');
const Company = require('../models/company')
const { Student } = require('../models/student');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports.allocateInterview = async(req, res) => {

    if(!ObjectId.isValid(req.params.id)) return res.status(404).json('No company found');
    if(!ObjectId.isValid(req.body.id)) return res.status(404).json('No Student found');
    
    try {
        let interview = new Interview({
            company: req.params.id,
            student: req.body.id
        })

        await interview.save();

        return res.status(401).json({
            message: 'Allocated Interview to student'
        })
    } catch (error) {  
        return res.status(500).json('Internal Server error')
    }

}

module.exports.getStudents = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) return res.status(404).json('No Interview found');

    try {

        // let company = wait
        let studentsArray = await Interview.find({company: req.params.id}, "-company")
                                            .populate('student','-updatedAt -createdAt');
        
        return res.status(200).json(studentsArray);

        


    } catch (error) {
        return res.status(500).json(error.message);
    }

}

module.exports.setresultStatus = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)) return res.status(404).json('No Student found');
    if(!ObjectId.isValid(req.body.id)) return res.status(404).json('No Company found');

    try {
        let interview = await Interview.findOne({company: req.body.id, student: req.params.id},)
        if(!interview) return res.status(404).json({message: 'No interview found!'})

        let student = await Student.findOne({_id: req.params.id})
        if(!student) return res.status(404).json({message: 'No Student found!'})


        interview.status = req.body.status;

        if(req.body.status === 'PASS'){
            student.isPlaced = true;
            await student.save();
        }

        await interview.save()
        return res.status(200).json({
                    message: 'Status updated',
                    interview
        })

    } catch (error) {
        return res.status(500).json(error.message);
        // console.log(error)
    }
}

