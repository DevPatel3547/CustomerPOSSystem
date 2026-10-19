// End-to-end against a real PostgreSQL. Runs only when POS_INTEGRATION=1
// (CI starts a postgres service and sets it); skipped otherwise.
const run = process.env.POS_INTEGRATION === '1' ? describe : describe.skip;

run('API against PostgreSQL', () => {
  let request; let app; let sequelize;

  beforeAll(async () => {
    request = require('supertest');
    app = require('../app');
    ({ sequelize } = require('../db'));
    await sequelize.query('DROP TABLE IF EXISTS menu');
    await sequelize.query('CREATE TABLE menu (name_of_item TEXT PRIMARY KEY, cost_of_item NUMERIC(6,2), stock INT)');
  });

  afterAll(async () => { await sequelize.close(); });

  test('insert, read, update, decrement and delete a menu item', async () => {
    await request(app).post('/insertInto').send({ table: 'menu', name_of_item: "O'Lulu", cost_of_item: '5.25', stock: 10 }).expect(200);
    let rows = (await request(app).get('/getTable/menu').expect(200)).body;
    expect(rows).toEqual([{ name_of_item: "O'Lulu", cost_of_item: '5.25', stock: 10 }]);

    await request(app).post('/updateprice').send({ table: 'menu', cost_of_item: '6.10', identify: 'name_of_item', identifyKey: "O'Lulu" }).expect(200);
    await request(app).post('/updateMinus').send({ table: 'menu', stock: 3, identify: 'name_of_item', identifyKey: "O'Lulu" }).expect(200);
    await request(app).post('/updateTable').send({ table: 'menu', name_of_item: 'Orange Lulu', identify: 'name_of_item', identifyKey: "O'Lulu" }).expect(200);
    rows = (await request(app).get('/getTable/menu').expect(200)).body;
    expect(rows).toEqual([{ name_of_item: 'Orange Lulu', cost_of_item: '6.10', stock: 7 }]);

    await request(app).post('/deleteItem').send({ table: 'menu', identify: 'name_of_item', identifyKey: 'Orange Lulu' }).expect(200);
    rows = (await request(app).get('/getTable/menu').expect(200)).body;
    expect(rows).toEqual([]);
  });

  test('an injected table name is refused and the table survives', async () => {
    await request(app).get('/getTable/' + encodeURIComponent('menu; DROP TABLE menu')).expect(400);
    await request(app).get('/getTable/menu').expect(200);
  });
});
