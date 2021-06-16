
process.env.SERVER_PORT = '8081';
process.env.NODE_ENV='test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from "sinon";
import server from '../../src';
import MarvelService from "../../src/services/marvel.service";

chai.use(chaiHttp);
const expect = chai.expect;


describe('Characters Service', () => {

    describe('/characters', () => {
        let charsStub:any;
        const expectedResult = [1, 2];
        beforeEach(() => {
            charsStub = sinon.stub(MarvelService.prototype, "characters").returns(new Promise((resolve) => { resolve(expectedResult) }))
        })
        afterEach(() => {
            charsStub.restore()
        })
        it('should get list of characters from marvel api', (done) => {
            chai.request(server)
            .get('/characters')
            .end((err, res) => {
                expect(res.status).to.eq(200)
                expect(charsStub.calledOnce).to.be.true;
                expect(res?.body?.data).to.deep.equal(expectedResult)
                done();
            });
        });

        it('should get list of characters from cache', (done) => {
            chai.request(server)
            .get('/characters')
            .end((err, res) => {
                expect(res.status).to.eq(200)
                expect(charsStub.calledOnce).to.be.false;
                expect(res?.body?.data).to.deep.equal(expectedResult)
                done();
            });

        });

        it('raise an error when mock to throw exception', (done) => {
            charsStub.restore()
            const stub = sinon.stub(MarvelService.prototype, "characters").throws()
            chai.request(server)
            .get('/characters?limit=aa')
            .end((err, res) => {
                expect(res.status).to.eq(500)
                expect(res.body).to.have.any.keys('error')
                stub.restore()
                done();
            });
        });
    });

    describe('/characters', () => {
        let charStub:any;
        const expectedResult = {
            id:1,
            name: 'Spiderman',
            description: 'Peter Parker'
        }
        beforeEach(() => {
            charStub = sinon.stub(MarvelService.prototype, 'character').returns(new Promise((resolve) => { resolve(expectedResult) }))
        })
        afterEach(() => {
            charStub.restore()
        })
        it('should get list of characters from marvel api', (done) => {
            chai.request(server)
            .get('/characters/123')
            .end((err, res) => {
                expect(res.status).to.eq(200)
                expect(charStub.calledOnce).to.be.true;
                expect(res?.body?.data).to.deep.equal(expectedResult)
                done();
            });
        });

        it('raise an error when mock to throw exception', (done) => {
            charStub.restore()
            const stub = sinon.stub(MarvelService.prototype, "characters").throws()
            chai.request(server)
            .get('/characters?limit=aa')
            .end((err, res) => {
                expect(res.status).to.eq(500)
                expect(res.body).to.have.any.keys('error')
                stub.restore()
                done();
            });
        });
    });
});