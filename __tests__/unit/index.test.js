const { describe, it, expect } = require('@jest/globals');
const ServiceUser = require('../../src/service/user');

describe("Testes para método create de usuário", () => {
    it('Deve criar um usuário enviando todos os campos corretamente para criar um usuário admin', () => {
        const organizationId = 3;
        const name = 'Victor';
        const email = 'victor2@teste2434.com';
        const password = '123123';
        const role = 'admin';

        const user = ServiceUser.Create(organizationId, name, email, password, role);

        expect(user.organizationId).toBe(organizationId);
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        // expect(user.password).toBe(hashPassowrd);
        expect(user.role).toBe(role);
    });

    it('Deve criar um usuário enviando todos os campos corretamente para criar um usuário employee', () => {
        const organizationId = 33;
        const name = 'Victor';
        const email = 'victor2@teste2235.com';
        const password = '123123';
        const role = 'employee';

        const user = ServiceUser.Create(organizationId, name, email, password, role);

        expect(user.organizationId).toBe(organizationId);
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        // expect(user.password).toBe(hashPassowrd);
        expect(user.role).toBe(role);
    });

    it('Deve criar um usuário sem enviar o organizationId', () => {
        const name = 'Victor';
        const email = 'victor2@batata.com';
        const password = '123123';
        const role = 'employee';

        const result = () => ServiceUser.Create(undefined, name, email, password, role, transaction);

        expect(result).toThrow("Favor informar a organização");
    });

    it('Deve criar um usuário sem enviar o organizationId', () => {
        const organizationId = 33;
        const name = 'Victor';
        const password = '123123';
        const role = 'employee';

        const result = () => ServiceUser.Create(organizationId, name, undefined, password, role);

        expect(result).toThrow("Favor informar a organização");
    });
})