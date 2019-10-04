import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import entries from '../models/entries';

const { expect } = chai;
chai.use(chaiHttp);
let userToken;
const token = '';
let notYourToken;
let nonExistToken = jwt.sign({
  Id: 70,
  userEmail: 'ngirimanawerrt@gmail.com',
}, process.env.Token_Key);
const invalidToken = 'hsgbs shgbhsbd dhbfhsdbfbds fhsbhfbhsbfhbdsf sfdhsdbfdbshdbf';
describe(' 3. POST entries ,/api/v2/entries', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'chadrack@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      userToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'jmv@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      notYourToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return "title" is required ', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[4])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" is required');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return "title" is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[1])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" is not allowed to be empty');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return "description" is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[2])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"description" is not allowed to be empty');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return "title" must be a string', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[3])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" must be a string');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return You haven\'t provide your token', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('You haven\'t provide your token');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return You are not authorized to perform this action', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', nonExistToken)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('You are not authorized to perform this task');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return jwt malformed', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return Your entries  are not found!', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Your entries  are not found!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return entry successfully created', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('entry successfully created');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe(' 4. PATCH entries ,/api/v2/entries/:entryId', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'chadrack@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      userToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return id is not number ', (done) => {
    chai.request(app)
      .patch('/api/v2/entries/wrt')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[5])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Entry id should be a number ');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return id is not found ', (done) => {
    chai.request(app)
      .patch('/api/v2/entries/10')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[5])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return this entry does not belongs to you ', (done) => {
    chai.request(app)
      .patch('/api/v2/entries/1')
      .set('x-auth-token', notYourToken)
      .set('Accept', 'application/json')
      .send(entries[5])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return entry successfully edited', (done) => {
    chai.request(app)
      .patch('/api/v2/entries/1')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .send(entries[5])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('entry successfully edited');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe(' 5. GET entries ,/api/v2/entries', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'chadrack@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      userToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return Your available entries are: ', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Your available entries are: ');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe(' 6. GET entries ,/api/v2/entries/:entryId', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'chadrack@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      userToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return id is not number ', (done) => {
    chai.request(app)
      .get('/api/v2/entries/wrt')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Entry id should be a number ');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return id is not found ', (done) => {
    chai.request(app)
      .get('/api/v2/entries/100')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'jmv@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      notYourToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return this entry does not belongs to you ', (done) => {
    chai.request(app)
      .get('/api/v2/entries/1')
      .set('x-auth-token', notYourToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return Your Entry was found ', (done) => {
    chai.request(app)
      .get('/api/v2/entries/1')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Your Entry was found');
        done();
      })

      .catch((err) => {
        console.log(err);
      });
  });
});
describe('7 . DELETE entries ,/api/v2/entries/:entryId', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'chadrack@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      userToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return id is not number ', (done) => {
    chai.request(app)
      .delete('/api/v2/entries/wrt')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Entry id should be a number ');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return id is not found ', (done) => {
    chai.request(app)
      .delete('/api/v2/entries/10')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('This entry is not avaialable');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  beforeEach((done) => {
    chai.request(app).post('/api/v2/auth/signin').send({
      email: 'jmv@gmail.com',
      password: 'safari1006',
    }).then((res) => {
      notYourToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return this entry does not belongs to you ', (done) => {
    chai.request(app)
      .delete('/api/v2/entries/1')
      .set('x-auth-token', notYourToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.equal('This entry doesn\'t belongs to you');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return entry successfully deleted', (done) => {
    chai.request(app)
      .delete('/api/v2/entries/1')
      .set('x-auth-token', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('entry successfully deleted');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
