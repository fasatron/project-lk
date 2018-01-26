const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    _id: String,
    title: String,
});


SkillSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'skills'
});

module.exports = mongoose.model('Skill', SkillSchema);