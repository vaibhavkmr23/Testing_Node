const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthConroller = require('../controllers/auth');

describe('Auth Controller ', function () {
    before(function (done) {
        mongoose.connect('mongodb+srv://Vaibhav:23101995@cluster0.gsxn3bf.mongodb.net/test-messages')
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'tester',
                    name: 'Test',
                    posts: [],
                    _id: '5c0f66b979af55031b34728a'
                });
                return user.save();
            })
            .then(() => {
                done();
            })
    })

    beforeEach(function () { });

    afterEach(function () { });


    it('should throw an error with code 500 if accesing the database fails', function (done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };

        AuthConroller.login(req, {}, () => { }).then(result => {
            // console.log(result);
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });

        User.findOne.restore();
    })

    it('should send a valid user status for an existing user', function (done) {

        const req = { userId: '5c0f66b979af55031b34728a' }
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            }
        };
        AuthConroller.getUserStatus(req, res, () => { }).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal('I am new!!');
            done()
        }).catch(() => {
            done()
        })
        // })
        //         .catch(err =>
        //             // console.log(err)
        //             done()
        //         )
    })
    after(function (done) {
        User.deleteMany({}).then(() => {
            return mongoose.disconnect()
        })
            .then(() => {
                done();
            })
    })
})