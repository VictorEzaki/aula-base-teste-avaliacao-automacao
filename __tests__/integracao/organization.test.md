const { describe, teste, expect, beforeAll } = require('@jest/globals');
const ServiceUser = require('../../src/service/user');
const ServiceOrganization = require('../../src/service/organization');
const sequelize = require('../../src/database');

// INSERT INTO organizations(name, address, phone, email) VALUES ("teste","teste", "47999999999", "teste@teste.com")

const bcrypt = require('bcrypt')
const salt = 12

describe('Teste de integração de organização', () => {
    let transaction;
    // let organizationId;
    
    beforeAll(async () => {
        transaction = await sequelize.db.transaction();
    })
    
    afterAll(async () => {
        transaction.rollback();
        await sequelize.db.close();
    });

    test("Criar uma organização", async () => {
        const name = 'Teste empada';
        const address = 'Rua das batatas';
        const email = 'empada@tesste22.com';
        const phone = '12341234';

        const organization = await ServiceOrganization.Create(name, address, phone, email, transaction);
        organizationId = organization.organization.id;

        // console.log(organization);

        expect(organization.organization.name).toBe(name);
        expect(organization.organization.address).toBe(address);
        expect(organization.organization.email).toBe(email);
        expect(organization.organization.phone).toBe(phone);
        expect(organization.user.name).toBe(`Admin ${name}`);
        expect(organization.user.email).toBe(email);
        expect(organization.user.role).toBe('admin');
    });

    test("Criar uma organização", async () => {
        const name = 'Teste empada';
        const address = 'Rua das batatas';
        const email = null;
        const phone = '12341234';

        const organization = () => ServiceOrganization.Create(name, address, phone, email, transaction);

        // console.log(organization);

        expect(organization).rejects.toThrow('Favor informar o campo email');
    });

    test("Busca uma organização", async () => {
        const name = 'Teste empada';
        const address = 'Rua das batatas';
        const email = 'empada@tesste22.com';
        const phone = '12341234';
        const id = organizationId;

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
        const id = organizationId;

        const organization = await ServiceOrganization.Update(id, name, address, phone, email, transaction);

        expect(organization.name).toBe(name);
        expect(organization.address).toBe(address);
        expect(organization.email).toBe(email);
        expect(organization.phone).toBe(phone);
    });

    test("Deleta uma organização", async () => {
        const id = organizationId;

        const organization = await ServiceOrganization.Delete(id, transaction);

        expect(organization).toBe(undefined);
    });

});