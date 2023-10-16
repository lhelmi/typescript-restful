import supertest from "supertest";
import { web } from "../src/app/Web";
import { logger } from "../src/app/Logger";
import { createUserTest, removeTestUser, getUserTest } from "./TestUtil";
import mongoose from "mongoose";
import config from "../src/config/Config";

describe('POST /api/users/register', function() {
    
    beforeEach(async() => {
        await mongoose.connect(`mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=admin`);
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

});

describe('POST /api/users/login', function() {
    
    beforeEach(async() => {
        await mongoose.connect(`mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=admin`);
        await createUserTest();
    });

    afterEach(async() => {
        await removeTestUser();
        await mongoose.disconnect();
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

    it('should login is invalid : wrong email', async() => {
        
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            email : 'testtes.cc',
            password : 'test'
        });
        
        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('should login is invalid : wrong password', async() => {
        
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            email : 'test@tes.cc',
            password : 'testxx'
        });
        
        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

});

describe('POST /api/users/current', function() {
    beforeEach(async() => {
        await mongoose.connect(`mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}?authSource=admin`);
        await createUserTest();
    });

    afterEach(async() => {
        await removeTestUser();
        await mongoose.disconnect();
    });

    it('should can get current user data', async() => {
        const resultLog = await supertest(web)
        .post('/api/users/login')
        .send({
            email : 'test@tes.cc',
            password : 'test'
        });
        
        expect(resultLog.status).toBe(200);
        expect(resultLog.body.data.token).toBeDefined();

        const token = resultLog.body.data.token;
        
        const result = await supertest(web)
        .get('/api/users/current')
        .set("Authorization", token);
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBeDefined();
        expect(result.body.data.full_name).toBeDefined();
        expect(result.body.data.password).toBeDefined();
    });

    it('should be rejected : token is malformat', async() => {
        const resultLog = await supertest(web)
        .post('/api/users/login')
        .send({
            email : 'test@tes.cc',
            password : 'test'
        });
        
        expect(resultLog.status).toBe(200);
        expect(resultLog.body.data.token).toBeDefined();

        const result = await supertest(web)
        .get('/api/users/current')
        .set("Authorization", 'kajsdhajshdjsa12312asddasjldjlasdj');
        
        logger.info(result.body);

        expect(result.status).toBe(401);
    });

    it('should be rejected : UNAUTHORIZED', async() => {
        const result = await supertest(web)
        .get('/api/users/current');
        
        
        logger.info(result.body);

        expect(result.status).toBe(401);
    });

    it('should be rejected : invalid token', async() => {
        const resultLog = await supertest(web)
        .post('/api/users/login')
        .send({
            email : 'test@tes.cc',
            password : 'test'
        });
        
        expect(resultLog.status).toBe(200);
        expect(resultLog.body.data.token).toBeDefined();

        const result = await supertest(web)
        .get('/api/users/current')
        .set("Authorization", 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNjOWFiMzE3ZTI4ZWZhM2NmM2Y2MzQiLCJmdWxsX25hbWUiOiJnb2xkIiwiY3VzdG9tZXJfaWQiOjE5LCJlbWFpbCI6ImdvbGRAZ28ubGQiLCJyb2xlIjoidXNlciIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDRUMDY6Mjk6MDcuNDk1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDRUMDY6Mjk6MDcuNDk1WiIsImlhdCI6MTY5MTEzMDU1MX0.OIZesNINEXgQ5yBYKH9LRYmEdZ6YTFteTri0Mz--fmQ');
        
        logger.info(result.body);

        expect(result.status).toBe(498);
    });
});