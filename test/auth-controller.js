const expect = require('chai').expect;
const sinon = require('sinon');

const User =  require('../models/user');
const AuthConroller = require('../controllers/auth');

describe('Auth Controller - Login', function(){
    it('should throw an error with code 500 if accesing the database fails', function(){
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        expect(AuthConroller.login)

        User.findOne.restore();
    } )
})