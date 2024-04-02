/* eslint-disable no-undef */
import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import StatusCodes from 'http-status-codes';
import taskMessages from '@/utils/taskMessages';
import db from '@/database';
import app from '../src/app';

const { expect } = chai;
chai.use(chaiHttp);

const Task = db.models.task;

describe('Task Routes', () => {
  const taskId = 1;
  const task = {
    name: 'Test Task',
    description: 'This is a test task',
    author: 'Author 1',
  };

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('POST /tasks', () => {
    it('should create a new task', (done) => {
      sandbox.stub(Task, 'create').resolves(task);

      chai
        .request(app)
        .post('/tasks')
        .send(task)
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.CREATED);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', task.name);
          done();
        });
    });
  });

  describe('GET /tasks', () => {
    it('should get all tasks', (done) => {
      sandbox.stub(Task, 'findAll').resolves([task, task]);

      chai
        .request(app)
        .get('/tasks')
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.OK);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /tasks/:id', () => {
    it('should get a task by its ID', (done) => {
      sandbox.stub(Task, 'findByPk').resolves({ task, id: taskId });

      chai
        .request(app)
        .get(`/tasks/${taskId}`)
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.OK);
          expect(res.body).to.have.property('id', taskId);
          done();
        });
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task', (done) => {
      sandbox.stub(Task, 'update').resolves([1]);

      chai
        .request(app)
        .put(`/tasks/${taskId}`)
        .send({ ...task, name: 'Updated Task' })
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.OK);
          expect(res.body).to.have.property('message', taskMessages.TASK_UPDATED);
          done();
        });
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', (done) => {
      sandbox.stub(Task, 'destroy').resolves(1);

      chai
        .request(app)
        .delete(`/tasks/${taskId}`)
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.OK);
          expect(res.body).to.have.property('message', taskMessages.TASK_DELETED);
          done();
        });
    });
  });
});
