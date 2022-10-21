const { expect } = require('chai');
const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function () {
    it('should throw an error if no authorization header is present', function () {
        const req = {
            get: function (headerName) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw('Not authenticated.');
    });

    it('should throw an error if the authorization header is only string', function () {
        const req = {
            get: function (headerName) {
                return 'xysa'
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
    })

    it('should throw an error if token cannot be verified', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer xyz'
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw()
    });

    it('should should yield a userId after decoding the token', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer kslslslskk'
            }
        };
        authMiddleware(req, {}, () => { });
        expect(req).to.have.property('userId');
    });
})
