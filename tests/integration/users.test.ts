import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/users-factory";
import { cleanDb } from "../helpers";
import { prisma } from "../../src/config/database";
import app, { init } from "../../src/app";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /users/sign-up', () => {
    it('should respond with status 400 when body is not given', async () => {
      const response = await server.post('/users/sign-up');
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  
    it('should respond with status 400 when body is not valid', async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
  
      const response = await server.post('/users/sign-up').send(invalidBody);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  
    describe('when body is valid', () => {
      const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
  
      it('should respond with status 201 and create user when given email is unique', async () => {
        const body = generateValidBody();
  
        const response = await server.post('/users/sign-up').send(body);
  
        expect(response.status).toBe(httpStatus.CREATED);
      });
  
      it('should not return user password on body', async () => {
        const body = generateValidBody();
  
        const response = await server.post('/users/sign-up').send(body);
  
        expect(response.body).not.toHaveProperty('password');
      });
  
      it('should save user on db', async () => {
        const body = generateValidBody();
  
        await server.post('/users/sign-up').send(body);
  
        const user = await prisma.user.findUnique({
          where: { email: body.email },
        });

        expect(user);
      });
    });
});

describe('POST /users/sign-in', () => {
    it('should respond with status 400 when body is not given', async () => {
      const response = await server.post('/users/sign-in');
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  
    it('should respond with status 400 when body is not valid', async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
  
      const response = await server.post('/users/sign-in').send(invalidBody);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  
    describe('when body is valid', () => {
      const generateValidBody = (passwordLength = 10) => ({
        email: faker.internet.email(),
        password: faker.internet.password(passwordLength),
      });
  
      it('should respond with status 400 if the password has less than 10 characters', async () => {
        const body = generateValidBody(6);
  
        const response = await server.post('/users/sign-in').send(body);
  
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
  
      it('should respond with status 401 if there is no user for given email', async () => {
        const body = generateValidBody();
  
        const response = await server.post('/users/sign-in').send(body);
  
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
  
      it('should respond with status 401 if there is a user for given email but password is not correct', async () => {
        const body = generateValidBody();
        await createUser(body);
  
        const response = await server.post('/users/sign-in').send({
          ...body,
          password: faker.lorem.word(10),
        });
  
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
  
      describe('when credentials are valid', () => {
        it('should respond with status 200', async () => {
          const body = generateValidBody();
          await createUser(body);
  
          const response = await server.post('/users/sign-in').send(body);
  
          expect(response.status).toBe(httpStatus.OK);
        });
  
        it('should respond with user data', async () => {
          const body = generateValidBody();
          const user = await createUser(body);
  
          const response = await server.post('/users/sign-in').send(body);
  
          expect(response.body.user).toEqual({
            id: user.id,
            email: user.email,
          });
        });
  
        it('should respond with session token', async () => {
          const body = generateValidBody();
          await createUser(body);
  
          const response = await server.post('/user/sign-in').send(body);
  
          expect(response.body.token);
        });
      });
    });
});