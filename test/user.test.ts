import supertest from "supertest";
import { web } from "../src/app/Web";
import { logger } from "../src/app/Logger";
import { removeTestUser } from "./test-util";
import mongoose from "mongoose";

describe('POST /api/users/register', function() {

    beforeEach(async() => {
        
    });

    afterEach(async() => {
        await removeTestUser();
        await mongoose.disconnect();
    });

    it('should can register new user', async() => {
        
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            full_name : 'test',
            customer_id : 20,
            email : 'test@tes.cc',
            password : 'test'
        });
        
        logger.info(result.body);

        expect(result.status).toBe(201);
        expect(result.body.data.full_name).toBe('test');
        expect(result.body.data.email).toBe('test@tes.cc');
        expect(result.body.data.customer_id).toBe(20);
    });

});