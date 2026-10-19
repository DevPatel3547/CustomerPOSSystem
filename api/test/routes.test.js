// Route tests against a recording fake of Sequelize's query interface (no database needed).
const calls = [];
const mockQi = {
  select: jest.fn(async (model, table) => { calls.push(['select', table]); return [{ id: 1, table }]; }),
  bulkInsert: jest.fn(async (...a) => { calls.push(['bulkInsert', ...a]); }),
  bulkUpdate: jest.fn(async (...a) => { calls.push(['bulkUpdate', ...a]); }),
  bulkDelete: jest.fn(async (...a) => { calls.push(['bulkDelete', ...a]); }),
  quoteIdentifier: (c) => `"${c}"`,
};

jest.mock('../db', () => {
  const actual = jest.requireActual('../db');
  return {
    ...actual,
    sequelize: {
      getQueryInterface: () => mockQi,
      literal: (s) => ({ literal: s }),
      escape: (v) => String(v),
    },
  };
});

const request = require('supertest');
const app = require('../app');

beforeEach(() => { calls.length = 0; jest.clearAllMocks(); });

test('GET /getTable/:table selects through the ORM', async () => {
  const res = await request(app).get('/getTable/Menu');
  expect(res.status).toBe(200);
  expect(res.body).toEqual([{ id: 1, table: 'menu' }]);
  expect(calls).toEqual([['select', 'menu']]);
});

test('table names that are not plain identifiers are rejected, not run', async () => {
  const res = await request(app).get('/getTable/' + encodeURIComponent('menu; DROP TABLE menu'));
  expect(res.status).toBe(400);
  expect(mockQi.select).not.toHaveBeenCalled();
});

test('POST /insertInto inserts the row as bound values', async () => {
  const res = await request(app).post('/insertInto').send({ table: 'menu', name_of_item: "O'Lulu", cost_of_item: '5.25' });
  expect(res.status).toBe(200);
  expect(calls).toEqual([['bulkInsert', 'menu', [{ name_of_item: "O'Lulu", cost_of_item: '5.25' }]]]);
});

test('POST /updateTable updates the identified row', async () => {
  await request(app).post('/updateTable')
    .send({ table: 'menu', cost_of_item: '6.00', identify: 'name_of_item', identifyKey: 'Orange Lulu' })
    .expect(200);
  expect(calls).toEqual([['bulkUpdate', 'menu', { cost_of_item: '6.00' }, { name_of_item: 'Orange Lulu' }]]);
});

test('POST /updateMinus decrements numeric columns', async () => {
  await request(app).post('/updateMinus')
    .send({ table: 'inventory', quantity: 2, identify: 'name', identifyKey: 'boba' })
    .expect(200);
  expect(calls).toEqual([['bulkUpdate', 'inventory', { quantity: { literal: '"quantity" - 2' } }, { name: 'boba' }]]);
});

test('POST /updateMinus rejects non-numeric amounts', async () => {
  await request(app).post('/updateMinus')
    .send({ table: 'inventory', quantity: '1; DROP TABLE x', identify: 'name', identifyKey: 'boba' })
    .expect(400);
  expect(mockQi.bulkUpdate).not.toHaveBeenCalled();
});

test('POST /updateprice sets cost_of_item', async () => {
  await request(app).post('/updateprice')
    .send({ table: 'menu', cost_of_item: '4.50', identify: 'name_of_item', identifyKey: 'Jasmine Green Tea' })
    .expect(200);
  expect(calls).toEqual([['bulkUpdate', 'menu', { cost_of_item: '4.50' }, { name_of_item: 'Jasmine Green Tea' }]]);
});

test('POST /deleteItem deletes the identified row', async () => {
  await request(app).post('/deleteItem').send({ table: 'menu', identify: 'name_of_item', identifyKey: 'Orange Lulu' }).expect(200);
  expect(calls).toEqual([['bulkDelete', 'menu', { name_of_item: 'Orange Lulu' }]]);
});

test('database errors become a 500 JSON response', async () => {
  mockQi.select.mockRejectedValueOnce(new Error('connection refused'));
  const res = await request(app).get('/getTable/menu');
  expect(res.status).toBe(500);
  expect(res.body.error).toBe('connection refused');
});
