const { User } = require('../../models');

module.exports = {
    users: {
        // GET /api/users
        get(req, res, next) {
            User.find()
                .then(users => res.status(200).json(users))
                .catch(next);
        },

        // POST /api/users
        post(req, res, next) {
            User.create(req.body)
                .then(user => res.status(201).json(user))
                .catch(next);
        }
    },

    user: {
        find(req, res, next, id) {
            User.findById(id)
                .then(user => {
                    if (!user) return res.sendStatus(404);
                    req.user = user;
                    next();
                })
                .catch(next);
        },

        // GET /api/users/:id
        get(req, res) {
            res.send(req.user);
        },

        // PUT /api/users/:id
        put(req, res, next) {
            req.user = Object.assign(req.user, req.body);
            
            req.user.save()
                .then(user => res.status(201).json(user))
                .catch(next);
        },

        // DELETE /api/users/:id
        delete(req, res, next) {
            req.user.remove()
                .then(() => res.sendStatus(204))
                .catch(next);
        },
    }
};