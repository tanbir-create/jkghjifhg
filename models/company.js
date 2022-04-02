const mongoose = require('mongoose');
const Joi = require('joi');

const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 255
    },

    interviewDate: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
})

function validateCompany(company) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        interviewDate: Joi.date().required()
    })

    return schema.validate(company);
}

const Company = new mongoose.model('Company', companySchema);
module.exports = {
    Company,
    validateCompany
};