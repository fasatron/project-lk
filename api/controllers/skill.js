const { Skill } = require('../../models');

module.exports = {
    skills: {
        // GET /api/skills
        get(req, res, next) {
            Skill.find()
                .then(skills => res.status(200).json(skills))
                .catch(next);
        },

        // POST /api/skills
        post(req, res, next) {
            Skill.create(req.body)
                .then(skill => res.status(201).json(skill))
                .catch(next);
        }
    },

    skill: {
        find(req, res, next, id) {
            Skill.findById(id)
                .then(skill => {
                    if (!skill) return res.sendStatus(404);
                    req.skill = skill;
                    next();
                })
                .catch(next);
        },

        // GET /api/skills/:id
        get(req, res) {
            res.send(req.skill);
        },

        // PUT /api/skills/:id
        put(req, res, next) {
            req.skill = Object.assign(req.skill, req.body);
            
            req.skill.save()
                .then(skill => res.status(201).json(skill))
                .catch(next);
        },

        // DELETE /api/skills/:id
        delete(req, res, next) {
            req.skill.remove()
                .then(() => res.sendStatus(204))
                .catch(next);
        },
    }
};