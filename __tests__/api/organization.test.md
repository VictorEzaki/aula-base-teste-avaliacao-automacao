const app = require('../../index');
const request = require('supertest');
const database = require('../../src/database');
const crypto = require('crypto');

describe('Teste de api para organization', () => {
    let token;
    let organization;
    let user;
    
    test('Criar uma organization', async () => {
        const body = {
            name: 'Teste Organization',
            address: 'Rua das organization',
            email: `api_${crypto.randomUUID()}@teste.com`,
            phone: '4712341234',
        }
        
        const res = await request(app)
        .post('/api/v1/organization')
        .send(body);
        
        expect(res.statusCode).toBe(200);
        
        user = res.body.organization.user;
        organization = res.body.organization.organization;
        
        expect(organization.name).toBe(body.name);
        expect(organization.address).toBe(body.address);
        expect(organization.email).toBe(body.email);
        expect(organization.phone).toBe(body.phone);
        expect(user.name).toBe(`Admin ${body.name}`);
        expect(user.email).toBe(body.email);
        expect(user.role).toBe('admin');
    });

    test('Efetua o login para pegar o token e utilizar nas demais rotas', async () => {
        const res = await request(app)
        .post('/api/v1/login')
        .send({ email: user.email, password: user.password });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        
        token = res.body.token;
    });
    
    test('Edita uma organization', async () => {
        const body = {
            name: 'Teste Organization editada',
            address: 'Rua das organization editada',
            email: `api_${crypto.randomUUID()}@teste.com`,
            phone: '4712341234',
        }

        const id = organization.id
        
        const res = await request(app)
        .put(`/api/v1/organization/${organization.id}`)
        .set('Authorization', token)
        .send(body);
        
        expect(res.statusCode).toBe(200);
        organization = res.body.organization;
        
        expect(organization.id).toBe(id);
        expect(organization.name).toBe(body.name);
        expect(organization.address).toBe(body.address);
        expect(organization.email).toBe(body.email);
        expect(organization.phone).toBe(body.phone);
    }); 
    
    // busca a organização criada nessa suíte
    test('Busca uma organization', async () => {
        const id = organization.id
        
        const res = await request(app)
        .get(`/api/v1/organization/${id}`)
        .set('Authorization', token);
        
        expect(res.statusCode).toBe(200);
        
        expect(res.body.organization.id).toBe(id);
        expect(res.body.organization.name).toBe(organization.name);
        expect(res.body.organization.address).toBe(organization.address);
        expect(res.body.organization.email).toBe(organization.email);
        expect(res.body.organization.phone).toBe(organization.phone);
    }); 

    // não funciona pois precisa deletar os usuários da organização antes deletá-la.
    // test('deleta uma organization', async () => {        
    //     const res = await request(app)
    //     .delete(`/api/v1/organization/${organization.id}`)
    //     .set('Authorization', token);
        
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body).toEqual({});
    // });    
});