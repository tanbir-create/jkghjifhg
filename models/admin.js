const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        maxlength: 100
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    }

}, {
    timestamps: true
});

adminSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET);
    return token;
}

function validateAdmin(admin) {
    const schema = Joi.object({
        name: Joi.string().max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.any().equal(Joi.ref('password')).required()
                    .messages({ 'any.only': "Passwords don't match" }),
        mentorCode: Joi.string().valid(process.env.MENTOR_CODE)
        .messages({ 'any.only': "Invalid mentor code" })
       
    })
    // .with('password', 'confirmPassword')

    return schema.validate(admin)
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports.Admin = Admin;
module.exports.validate = validateAdmin;
