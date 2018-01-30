const { Skill } = require('../../models');

module.exports = {
  findSkills(req, res, next) {
    Skill.find().then(data => {
      const skills = data || [];

      res.locals.skills = skills;

      next();
    });
  },

  findSkill(req, res, next, id) {
    Skill.findById(id)
      .then(data => {
        req.skill = data || {};

        next();
      })
      .catch(next);
  },

  
  // GET /admin/skills
  showIndexPage(req, res, next) {
    Skill.find()
      .then(data => {
        const skills = data || [];

        res.render('skills', { skills, title: 'Skills' });
      })
      .catch(next);
  },

  // GET /admin/skills/create
  showCreatePage(req, res) {
    res.render('skills/form', {
      skill: new Skill(),
    });
  },

  // GET /admin/skills/:skill/update
  showUpdatePage(req, res) {
    const skill = req.skill || {};

    res.render('skills/form', { skill });
  },


  // GET /admin/skills/:skill/delete
  showDeletePage(req, res) {
    const skill = req.skill || {};

    res.render('skills/delete', { skill });
  },

  // POST /admin/skills/:skill/create
  createSkill(req, res, next) {
    Skill.create({
      _id: req.body.id,
      title: req.body.title,
    })
      .then(() => res.redirect('/admin/skills'))
      .catch(next);
  },

  // POST /admin/skills/:skill/update
  updateSkill(req, res, next) {
    Skill.findOneAndUpdate({ _id: req.skill.id }, req.body)
      .then(skill => res.redirect('/admin/skills'))
      .catch(next);
  },


  // POST /admin/skills/:skill/delete
  deleteSkill(req, res, next) {
    req.skill
      .remove()
      .then(() => res.redirect('/admin/skills'))
      .catch(next);
  },
};
