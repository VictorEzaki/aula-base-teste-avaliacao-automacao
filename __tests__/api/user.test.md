const app = require('../../index');
const request = require('supertest');
const database = require('../../src/database');
const crypto = require('crypto');

describe('Teste de api para usuário', () => {
    let token;
    let organization;
    let user;
    let employee;
    
    beforeAll(async () => {
        const body = {
            name: 'Teste API',
            address: 'Rua das APIs',
            email: `api_${crypto.randomUUID()}@teste.com`,
            phone: '4712341234',
        }
        
        const res = await request(app)
        .post('/api/v1/organization')
        .send(body);
        
        user = res.body.organization.user;
        organization = res.body.organization.organization;
        
        const resLogin = await request(app)
        .post('/api/v1/login')
        .send({ email: user.email, password: user.password })
        
        expect(resLogin.statusCode).toBe(200);
        expect(resLogin.body.token).toBeDefined();
        
        token = resLogin.body.token;
    });
    
    afterAll(async () => {
        await database.db.close();
    });
    
    test('Criar um usuário novo', async () => {
        const body = {
            name: 'victor',
            email: `api_${crypto.randomUUID()}@teste.com`,
            password: '123123',
            role: 'admin'
        };
        
        const res = await request(app)
        .post('/api/v1/user')
        .set('Authorization', token)
        .send(body);
        
        expect(res.statusCode).toBe(200);
        
        expect(res.body.user).toBeDefined();
        expect(res.body.user.id).toBeDefined();
        expect(res.body.user.name).toBe(body.name);
        expect(res.body.user.email).toBe(body.email);
        expect(res.body.user.role).toBe(body.role);
    });
    
    test('Buscar um usuário (busca pelo usuário criado no beforeAll)', async () => {
        const res = await request(app)
        .get(`/api/v1/user/${user.id}`)
        .set('Authorization', token)
        
        expect(res.statusCode).toBe(200);
        
        expect(res.body.user.id).toBe(user.id);
        expect(res.body.user.name).toBe(user.name);
        expect(res.body.user.email).toBe(user.email);
        expect(res.body.user.role).toBe(user.role);
    });
    
    test('Editar um usuário existente', async () => {
        const body = {
            name: 'user_editado',
            email: `api_${crypto.randomUUID()}@teste.com`,
            password: '123123',
            role: 'admin'
        };
        
        const res = await request(app)
        .put(`/api/v1/user/${user.id}`)
        .set('Authorization', token)
        .send(body);
        
        expect(res.statusCode).toBe(200);
        
        // Sobrescreve o usuário criado no beforeAll pela rota de organization
        user = res.body.user;
        
        expect(res.body.user).toBeDefined();
        expect(res.body.user.id).toBe(user.id);
        expect(res.body.user.name).toBe(body.name);
        expect(res.body.user.email).toBe(body.email);
        expect(res.body.user.role).toBe(body.role);
    });
    
    test('Criar um usuário novo com role employee', async () => {
        const body = {
            name: 'employee',
            email: `api_${crypto.randomUUID()}@teste.com`,
            password: '123123',
            role: 'employee'
        };
        
        const res = await request(app)
        .post('/api/v1/user')
        .set('Authorization', token)
        .send(body);
        
        expect(res.statusCode).toBe(200);
        
        employee = res.body.user;
        
        expect(res.body.user).toBeDefined();
        expect(res.body.user.id).toBeDefined();
        expect(res.body.user.name).toBe(body.name);
        expect(res.body.user.email).toBe(body.email);
        expect(res.body.user.role).toBe(body.role);
    });
    
    test('Deleta um employee', async () => {
        const res = await request(app)
        .delete(`/api/v1/user/${employee.id}`)
        .set('Authorization', token)
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});
    });
    
    // Precisa ser o último, pois deleta o usuário criado no beforeAll
    test('Deleta um usuário admin', async () => {
        const res = await request(app)
        .delete(`/api/v1/user/${user.id}`)
        .set('Authorization', token)
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});
    });
});