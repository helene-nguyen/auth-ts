//~Import module
import request from 'supertest';
import { app } from './../../index.js';
import { extendToBeType, exist } from './../utils/utils.js';

const path = '/users';

const { body, statusCode } = await request(app).get(`${path}`);

//& Unit test

describe(`\x1b[1;107;34m📡  Unit Test - GET ${path} \x1b[0m`, () => {
  //? Corresponding user type
  describe(`  \x1b[1;4;94mCorresponding users type\x1b[0m`, () => {
    it('Should return an array of users objects', async () => {
      expect(body).toBeType('array');
    });
  });

  //? Corresponding user property
  describe(`  \x1b[1;4;94mCorresponding user property\x1b[0m`, () => {
    it('Should return an user object', async () => {
      expect(body[0]).toBeType('object');
    });
  });

  //& user existing Properties
  describe(`  \x1b[1;4;93mShould return existing property for user\x1b[0m`, () => {
    //? Corresponding existing Properties of user
    it('Should return existing user property', async () => {
      const properties = ['_id', 'username', 'email', 'password', 'role'];

      exist(body[0], properties);
    });
  });

  //? Corresponding type of property for a user
  describe(`  \x1b[1;4;94mCorresponding type of property for a user\x1b[0m`, () => {
    it(`Should return corresponding type of number for '_id'`, async () => {
      expect(body[0]._id).toBeType('string');
    });

    it(`Should return corresponding type of string for 'username'`, async () => {
      expect(body[0].username).toBeType('string');
    });

    it(`Should return corresponding type of string for 'email'`, async () => {
      expect(body[0].email).toBeType('string');
    });

    it(`Should return corresponding type of string for 'password'`, async () => {
      expect(body[0].password).toBeType('string');
    });

    it(`Should return corresponding type of string for 'role'`, async () => {
      expect(body[0].role).toBeType('string');
    });
  });
});
