const app = require('../../index');
const request = require('supertest');
const database = require('../../src/database');

describe('Teste de api para usuário', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInJvbGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbklkIjoxLCJpYXQiOjE3ODQwNzYzMzgsImV4cCI6MTc4NDA3OTkzOH0.ZHo6FOfGiPGRWOzN3AdeUiLhRcrj0HDemrggbU9XPXQ';

    test('Criar um usuário novo', async () => {
        const body = {
            name: 'Joao',
            email: 'joao@teste1.com.br',
            password: '123123',
            role: 'admin'
        };

        const res = await request(app)
            .post('/api/v1/user')
            .set('Authorization', token)
            .send(body);

        console.log(res.body);
    });
});