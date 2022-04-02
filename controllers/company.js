const { Company, validateCompany } = require('../models/company');
const _ = require('lodash');

module.exports.addNew = async ( req, res ) => {

    const { error } = validateCompany(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message });

    try {
        
        let company = new Company( _.pick(req.body, ['name', 'interviewDate']) );
        await company.save();

        return res.status(201).json({
            message: 'New company added',
            company
        })

    } catch (error) {
        return res.status(500).json(error.message);
    }

}

module.exports.getCompanies = async (req, res) => {
    
}