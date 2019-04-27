import test from 'ava';
import request from 'supertest';
import config from "config"
import Contest from 'models/Contest';
import { connectDB, dropDB } from 'utils/testDBConnection';
import app from 'index';

const url = config.localUrl;

const contests = [
  new Contest({
    name: "Test 1",
    description: "Desc 1",
    imageURL: "Image 1",
    contentURL: "Content 1",
    date: "Date 1",
    active: true
  }),
  new Contest({
    name: "Test 2",
    description: "Desc 2",
    imageURL: "Image 2",
    contentURL: "Content 2",
    date: "Date 2",
    active: false
  }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two post entries', async () => {
  await Contest.create(contests).catch(() => 'Unable to create contests');
});

// test.afterEach.always(async () => {
//   await dropDB();
// });

test.serial('Should correctly return contests', async t => {
  t.plan(1);

  const res = await request(url)
    .get('/api/contests')
  t.is(res.status, 200);
});

test.serial('Should correctly add a Contest', async t => {
  t.plan(2);

  const res = await request(url)
    .post('/api/contest')
    .send({
      name: 'Foo', description: 'bar', contentURL: 'Hello Mern says Foo', date: "DTE" 
    })
    .set('Accept', 'application/json');
  t.is(res.status, 200);

  const savedContest = await Contest.findOne({ description: 'bar' }).exec();
  t.is(savedContest.name, 'Foo');
  console.log("CONTEST", savedContest)
});

// test.serial('Should correctly edit a Contest', async t => {
//   t.plan(2);

//   const res = await request(url)
//     .post()
// })
