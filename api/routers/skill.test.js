const express = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { expect } = require('chai');

const { Skill } = require('../../models');
const skillRuter = require('./skill');

const app = express();

app.use(express.json());
app.use('/skills', skillRuter);

const request = supertest(app);

describe('/api', () => {
  let skill1 = new Skill({ _id: 'js', title: 'JavaScript' });
  let skill2 = new Skill({ _id: 'nodejs', title: 'Node.js' });
  let skill3 = new Skill({ _id: 'mongo', title: 'MongoDB' });

  before('Connect to db', () => {
    return mongoose.connect('mongodb://localhost:27017/codementor-test');
  });

  before('Initialize db', () => {
    return Skill.insertMany([skill1, skill2, skill3]);
  });

  after('Clean db', () => {
    return Skill.deleteMany({});
  });

  after('Disconnect from db', () => {
    return mongoose.disconnect();
  });

  describe('/skills', () => {
    describe('GET', () => {
      it('should return a list of skills', () => {
        return request
          .get('/skills')
          .expect(200)
          .then(res => {
            expect(res.body).to.have.length(3);
          });
      });
    });

    describe('POST', () => {
      it('should create a new skill', () => {
        return request
          .post('/skills')
          .set('Content-Type', 'application/json')
          .send({ _id: 'react', title: 'React' })
          .expect(201)
          .then(res => {
            expect(res.body.title).to.equal('React');
          });
      });
    });
  });

  describe('/skills/:id', () => {
    describe('GET', () => {
      it('should return a skill by id', () => {
        return request
          .get('/skills/nodejs')
          .expect(200)
          .then(res => {
            expect(res.body._id).to.equal('nodejs');
          });
      });
    });

    describe('PUT', () => {
      it('should update the skill', () => {
        return request
          .put('/skills/nodejs')
          .set('Content-Type', 'application/json')
          .send({ title: 'Nodejs' })
          .expect(201)
          .then(res => {
            expect(res.body.title).to.equal('Nodejs');
          });
      });
    });

    describe('DELETE', () => {
      it('should delete the skill', () => {
        return request.delete('/skills/nodejs').expect(204);
      });
    });
  });
});
