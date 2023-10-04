import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logger";
import { removeTestUser } from "./test-util";
// import bcrypt from "bcrypt";
import path from 'path';

describe('POST /api/users/register', function() {

    // afterEach(async() => {
    //     await removeTestUser();
    // });

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

    // it('should can register new user with image', async() => {

    //     const image = path.resolve(__dirname, '../public/test_upload/image.jpg');
        
    //     const result = await supertest(web)
    //     .post('/api/users/register')
    //     .set('content-type', 'application/octet-stream')
    //     .attach('image', image)
    //     .field('username', 'test')
    //     .field('password', 'test')
    //     .field('first_name', 'test')
    //     .field('last_name', 'test')
    //     .field('email', 'test@tes.cc');
        

    //     logger.info(result);

    //     expect(result.status).toBe(201);
    //     expect(result.body.data.username).toBe('test');
    //     expect(result.body.data.first_name).toBe('test');
    //     expect(result.body.data.last_name).toBe('test');
    // });
});