const { describe, teste, expect, beforeAll } = require('@jest/globals');
const ServiceUser = require('../../src/service/user');
const ServiceOrganization = require('../../src/service/organization');
const sequelize = require('../../src/database');
const crypto = require('crypto');

describe('Teste de integração de usuários', () => {
    let transaction;
    let organization;
    let user;
    
    beforeAll(async () => {
        transaction = await sequelize.db.transaction();

        const name = 'Teste empada';
        const address = 'Rua das batatas';
        const email = `api_${crypto.randomUUID()}@teste.com`;
        const phone = '12341234';

        const res = await ServiceOrganization.Create(name, address, phone, email);
        organization = res.organization;
        user = res.user;
    })
    
    afterAll(async () => {
        await transaction.rollback();
        await sequelize.db.close();
    });
    
    test("Criar um usuário admin", async () => {
        const organizationId = organization.id;
        const name = 'Victor';
        const email = `api_${crypto.randomUUID()}@teste.com`;
        const password = '123123';
        const role = 'admin';

        const user = await ServiceUser.Create(organizationId, name, email, password, role, transaction);

        expect(user.organizationId).toBe(organizationId);
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        expect(user.role).toBe(role);
    });

    test("Buscar um usuário", async () => {
        const organizationId = organization.id;
        const userId = user.id
        const name = user.name;
        const email = user.email;
        const role = user.role;


        const userFounded = await ServiceUser.FindById(organizationId, userId, transaction);

        expect(userFounded.id).toBe(userId);
        expect(userFounded.organizationId).toBe(organizationId);
        expect(userFounded.name).toBe(name);
        expect(userFounded.email).toBe(email);
        expect(userFounded.role).toBe(role);
    });

    test("Editar um usuário", async () => {
        const organizationId = organization.id;
        const name = 'Admin';
        const email = `api_${crypto.randomUUID()}@teste.com`;
        const password = '123123'
        const role = 'admin';
        const userId = user.id


        const userUpdated = await ServiceUser.Update(organizationId, userId, name, email, password, role, transaction);

        expect(userUpdated.organizationId).toBe(organizationId);
        expect(userUpdated.name).toBe(name);
        expect(userUpdated.email).toBe(email); 
        expect(userUpdated.role).toBe(role);
    });

    test("Deletar um usuário", async () => {
        const organizationId = organization.id;
        const userId = user.id;

        const userDeleted = await ServiceUser.Delete(organizationId, userId, transaction);

        expect(userDeleted).toBeUndefined();
    });
});