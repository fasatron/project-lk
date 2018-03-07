const { expect } = require('chai');
const sinon = require('sinon');

const configureSkillController = require('./skill');

describe('skillController', () => {
  class Skill {
    static find() {}
    static create() {}
    save() {}
    remove() {}
  }

  const SKILLS = [new Skill(), new Skill(), new Skill()];
  const SKILL = new Skill();

  sinon.stub(Skill, 'find').resolves(SKILLS);
  sinon.stub(Skill, 'create').resolves(SKILL);
  sinon.stub(SKILL, 'save').resolves(SKILL);
  sinon.stub(SKILL, 'remove').resolves();

  const skillController = configureSkillController(Skill);

  describe('skills', () => {
    describe('get', () => {
      it('should send an array with status 200', () => {
        const req = {};
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy(),
        };

        return skillController.skills.get(req, res).then(() => {
          expect(res.status.calledOnce).to.equal(true);
          expect(res.status.calledWith(200)).to.equal(true);
          expect(res.json.calledWith(SKILLS)).to.equal(true);
        });
      });
    });
    describe('post', () => {
      it('should send and object with status 201', () => {
        const req = {
          body: { slug: '', title: '' },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy(),
        };

        return skillController.skills.post(req, res).then(() => {
          expect(res.status.calledWith(201)).to.equal(true);
          expect(res.json.calledWith(SKILL)).to.equal(true);
        });
      });
    });
  });

  describe('skill', () => {
    describe('get', () => {
      it('should send an object', () => {
        const req = { skill: SKILL };
        const res = {
          send: sinon.stub(),
        };

        skillController.skill.get(req, res);

        expect(res.send.calledOnce).to.equal(true);
        expect(res.send.calledWith(SKILL)).to.equal(true);
      });
    });
    describe('put', () => {
      it('should send and object with status 201', () => {
        const req = { skill: SKILL, body: { title: '' } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.spy(),
        };

        return skillController.skill.put(req, res).then(() => {
          expect(res.status.calledOnce).to.equal(true);
          expect(res.status.calledWith(201)).to.equal(true);
          expect(res.json.calledWith(SKILL)).to.equal(true);
        });
      });
    });
    describe('delete', () => {
      it('should send status 204', () => {
        const req = { skill: SKILL };
        const res = {
          sendStatus: sinon.stub(),
        };

        return skillController.skill.delete(req, res).then(() => {
          expect(res.sendStatus.calledOnce).to.equal(true);
          expect(res.sendStatus.calledWith(204)).to.equal(true);
        });
      });
    });
  });
});
