import supertest from "supertest";
import { web } from "../src/app/Web";
import { logger } from "../src/app/Logger";
import { createUserTest, removeTestUser, getUserTest } from "./TestUtil";
import mongoose from "mongoose";
import config from "../src/config/Config";
import jwt from 'jsonwebtoken';

describe('POST /api/users', function() {
    
    beforeEach(async() => {
        await mongoose.connect(`mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=admin`);
        await createUserTest();
        // let user = await getUserTest();
        // let signed = jwt.sign(user, config.jwtSecretKey as string);
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

    it('should rejected : full_name, password is empty ', async() => {
        
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            full_name : '',
            customer_id : 20,
            email : 'testtes.cc', //the error
            password : ''
        });
        
        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined;
        expect(result.body.field).toBeDefined;
        expect(result.body.field.email).toBeDefined;
        
    });

    it('should rejected : duplicate email account ', async() => {
        
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            full_name : 'test',
            customer_id : 20,
            // email : 'testtes.cc', //the error
            email : 'gold@go.ld', //the error : duplicate email account
            password : 'test'
        });
        
        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined;
        expect(result.body.field).toBeDefined;
        expect(result.body.field.email).toBeDefined;
        
    });

    it('should rejected : invalid email ', async() => {
        
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            full_name : 'test',
            customer_id : 20,
            email : 'testtes.cc', //the error
            password : 'test'
        });
        
        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined;
        expect(result.body.field).toBeDefined;
        expect(result.body.field.email).toBeDefined;
        
    });

    it('should can login', async() => {
        
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            email : 'test@tes.cc',
            password : 'test'
        });
        
        logger.info(result.body);

        expect(result.status).toBe(200);
    });

});