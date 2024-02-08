const { TextEncoder, TextDecoder } = require('util');
const { mongoConnect } = require('../../services/mongo');
Object.assign(global, { TextDecoder, TextEncoder });

const request = require('supertest');
const App = require('../../app.js');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    describe('Test GET/ launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(App)
                .get('/v1/launches')
                .expect('Content-Type', /json/) 
                .expect(200);
        });    
    });
    
    describe('Test POST/ launch', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-296 f',
            launchDate: 'January 4, 2028',
        };
    
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-296 f',
        }

        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'zoot',
        };
    
        test('It should respond with 201 success', async () => {
            const response = await request(App)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/) 
                .expect(201);
    
            expect(response.body).toMatchObject(launchDataWithoutDate);
            
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
        
            expect(responseDate).toBe(requestDate);
        });
    
        test('It should catch missing required properties', async () => {
            const response = await request(App)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/) 
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Launch property is missing'
            });
        });
        
        test('It should catch invalid dates', async () => {
            const response = await request(App)
              .post('/v1/launches')
              .send(launchDataWithInvalidDate)
              .expect('Content-Type', /json/)
              .expect(400);
        
            expect(response.body).toStrictEqual({
              error: 'Launch date is not valid',
            });
        });
    });
});