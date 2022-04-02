const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        requried: true
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        requried: true
    },

    status: {
        type: String,
        default: "DIDN'T-ATTEMPT",
        uppercase: true,
        enum: ['PASS', 'FAIL', 'ON-HOLD', "DIDN'T-ATTEMPT"] 
    }

},
{
    timestamps: true
})


const Interview = new mongoose.model('Interview', interviewSchema);
module.exports = Interview;