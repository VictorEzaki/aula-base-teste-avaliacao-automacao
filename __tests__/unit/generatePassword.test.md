const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const generatePassowrd = require('./../../src/fns/generate-password');

describe('Teste unitário da função de gerar senha', () => {
    test('Gerar senha nova', async () => {
        const senha = await generatePassowrd();

        // console.log('Senha aqui >>>>>>>>>>>>>>>>>>>>>', senha);
        expect(senha).not.toBeNull;
    });

    test('Gerar senha diferentes a cada execução', async () => {
        const senha1 = await generatePassowrd();
        const senha2 = await generatePassowrd();

        // console.log('Senha aqui >>>>>>>>>>>>>>>>>>>>>', senha);
        expect(senha1).not.toBe(senha2);
    });

    test('Gerar senha com 36 caracteres', async () => {
        const senha = await generatePassowrd();

        // console.log('Senha aqui >>>>>>>>>>>>>>>>>>>>>', senha);
        expect(senha).toHaveLength(36);
    });

    test('Gerar senha deve conter caracteres hexadecimais', async () => {
        const senha = await generatePassowrd();

        // console.log('Senha aqui >>>>>>>>>>>>>>>>>>>>>', senha);
        expect(senha).toMatch(/^[0-9a-f]+$/);
    });

});