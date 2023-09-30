import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logger";
import { removeTestUser } from "./test-util";
import bcrypt from "bcrypt";

describe('POST /api/users/register', function() {

    afterEach(async() => {
        await removeTestUser();
    });

    it('should can register new user', async() => {
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            username : 'test',
            password : 'test',
            first_name : 'test',
            last_name : 'test',
            email : 'test@tes.cc'
        });

        logger.info(result.body);

        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.first_name).toBe('test');
        expect(result.body.data.last_name).toBe('test');
    });
});