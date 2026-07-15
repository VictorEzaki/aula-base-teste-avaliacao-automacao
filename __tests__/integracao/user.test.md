const { describe, teste, expect, beforeAll } = require('@jest/globals');
const ServiceUser = require('../../src/service/user');
const ServiceOrganization = require('../../src/service/organization');
const sequelize = require('../../src/database');

describe('Teste de integração de usuários', () => {
    let transaction;
    
    // beforeAll(async () => {
    //     transaction = await sequelize.db.transaction();
    // })
    
    // afterAll(async () => {
    //     transaction.rollback();
    //     await sequelize.db.close();
    // });
    
    // test("Criar um usuário", async () => {
    //     const organizationId = 1;
    //     const name = 'Victor';
    //     const email = 'victor@teste.com';
    //     const password = '123123';
    //     const role = 'admin';

    //     const user = await ServiceUser.Create(organizationId, name, email, password, role);

    //     expect(user.organizationId).toBe(organizationId);
    //     expect(user.name).toBe(name);
    //     expect(user.email).toBe(email);
    //     // expect(user.password).toBe(hashPassowrd);
    //     expect(user.role).toBe(role);
    // });

    // test("Buscar um usuário", async () => {
    //     const organizationId = 3;
    //     const name = 'Admin Teste empada';
    //     const email = 'empada@teste.com';
    //     const hashPassowrd = '$2b$12$KVFCdAHu9sPOBeOfYEsjz.AQGr0zCCalTM9UYUQDiuNMasW3RVF4i';
    //     const role = 'admin';
    //     const userId = 2


    //     const user = await ServiceUser.FindById(organizationId, userId, transaction);

    //     expect(user.organizationId).toBe(organizationId);
    //     expect(user.name).toBe(name);
    //     expect(user.email).toBe(email);
    //     expect(user.password).toBe(hashPassowrd);
    //     expect(user.role).toBe(role);
    // });

    // test("Editar um usuário", async () => {
    //     const organizationId = 3;
    //     const name = 'Admin';
    //     const email = 'empada@edit.com';
    //     const password = '123123'
    //     // const hashPassowrd = await bcrypt.hash(password, salt);
    //     const role = 'admin';
    //     const userId = 2


    //     const user = await ServiceUser.Update(organizationId, userId, name, email, password, role, transaction);

    //     expect(user.organizationId).toBe(organizationId);
    //     expect(user.name).toBe(name);
    //     expect(user.email).toBe(email); 
    //     // expect(user.password).toBe(hashPassowrd);
    //     expect(user.role).toBe(role);
    // });

    // test("Deletar um usuário", async () => {
    //     const organizationId = 3;
    //     const userId = 2

    //     const user = await ServiceUser.Delete(organizationId, userId, transaction);

    //     expect(user).toBe(undefined);
    // });
});