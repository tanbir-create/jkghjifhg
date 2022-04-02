const mongoose = require('mongoose');
const Joi = require('joi')

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        requried: true,
        maxlength: 255
    },

    college: {
        type: String,
        required: true,
    },

    batch: {
        month: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },

    courseScores: {
        dsa: {
            type: Number,
            max: 100
        },
        webD: {
            type: Number,
            max: 100
        },
        react: {
            type: Number,
            max: 100
        }
    },

    isPlaced: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
})


function validateStudent(student) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        college: Joi.string().required(),
            // batch: Joi.object().keys({
        month: Joi.string().required(),
        year: Joi.number().required(),
            // }),
            // courseScores: Joi.object().keys({
        dsa: Joi.number().max(100),
        webD: Joi.number().max(100),
        react: Joi.number().max(100)
            // })
    })

    return schema.validate(student);
}

const Student = new mongoose.model('Student', studentSchema);
module.exports = {
    Student,
    validateStudent
};