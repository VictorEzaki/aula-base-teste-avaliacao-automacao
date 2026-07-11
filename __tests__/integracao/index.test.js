const { describe, teste, expect, beforeAll } = require('@jest/globals');
const ServiceUser = require('../../src/service/user');
const ServiceOrganization = require('../../src/service/organization');
const sequelize = require('../../src/database');

const bcrypt = require('bcrypt')
const salt = 12

let transaction;

beforeAll(async () => {
    transaction = await sequelize.db.transaction();
})

afterAll(async () => {
    transaction.rollback();
    await sequelize.db.close();
});

describe('Teste de integração de organização', () => {
    test("Criar uma organização", async () => {
        const name = 'Teste empada';
        const address = 'Rua das batatas';
        const email = 'empada@tesste22.com';
        const phone = '12341234';

        const organization = await ServiceOrganization.Create(name, address, phone, email, transaction);

        expect(organization.organization.name).toBe(name);
        expect(organization.organization.address).toBe(address);
        expect(organization.organization.email).toBe(email);
        expect(organization.organization.phone).toBe(phone);
        expect(organization.user.name).toBe(`Admin ${name}`);
        expect(organization.user.email).toBe(email);
        expect(organization.user.role).toBe('admin');
    });

    test("Busca uma organização", async () => {
        const name = 'Empresa Victor';
        const address = 'Rua das batatas';
        const email = 'empada@teste2.com';
        const phone = '12341234';
        const id = 3;

        const organization = await ServiceOrganization.FindById(id, transaction);

        expect(organization.name).toBe(name);
        expect(organization.address).toBe(address);
        expect(organization.email).toBe(email);
        expect(organization.phone).toBe(phone);
    });

    test("Editar uma organização", async () => {
        const name = 'Empresa Victor';
        const address = 'Rua das batatas';
        const email = 'empada@teste2.com';
        const phone = '12341234';
        const id = 3;

        const organization = await ServiceOrganization.Update(id, name, address, phone, email, transaction);

        expect(organization.name).toBe(name);
        expect(organization.address).toBe(address);
        expect(organization.email).toBe(email);
        expect(organization.phone).toBe(phone);
    });

    test("Deleta uma organização", async () => {
        const id = 3;

        const organization = await ServiceOrganization.Delete(id, transaction);

        expect(organization).toBe(undefined);
    });

});

describe('Teste de integração de usuários', () => {
    test("Criar um usuário", async () => {
        const organizationId = 33;
        const name = 'Victor';
        const email = 'victor2@teste23.com';
        const password = '123123';
        const role = 'admin';

        const hashPassowrd = await bcrypt.hash(password, salt);

        const user = await ServiceUser.Create(organizationId, name, email, password, role, transaction);

        expect(user.organizationId).toBe(organizationId);
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        // expect(user.password).toBe(hashPassowrd);
        expect(user.role).toBe(role);
    });

    test("Buscar um usuário", async () => {
        const organizationId = 3;
        const name = 'Admin Teste empada';
        const email = 'empada@teste.com';
        const hashPassowrd = '$2b$12$KVFCdAHu9sPOBeOfYEsjz.AQGr0zCCalTM9UYUQDiuNMasW3RVF4i';
        const role = 'admin';
        const userId = 2


        const user = await ServiceUser.FindById(organizationId, userId, transaction);

        expect(user.organizationId).toBe(organizationId);
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        expect(user.password).toBe(hashPassowrd);
        expect(user.role).toBe(role);
    });

    test("Editar um usuário", async () => {
        const organizationId = 3;
        const name = 'Admin';
        const email = 'empada@edit.com';
        const password = '123123'
        // const hashPassowrd = await bcrypt.hash(password, salt);
        const role = 'admin';
        const userId = 2


        const user = await ServiceUser.Update(organizationId, userId, name, email, password, role, transaction);

        expect(user.organizationId).toBe(organizationId);
        expect(user.name).toBe(name);
        expect(user.email).toBe(email); 
        // expect(user.password).toBe(hashPassowrd);
        expect(user.role).toBe(role);
    });

    test("Deletar um usuário", async () => {
        const organizationId = 3;
        const userId = 2

        const user = await ServiceUser.Delete(organizationId, userId, transaction);

        expect(user).toBe(undefined);
    });
});