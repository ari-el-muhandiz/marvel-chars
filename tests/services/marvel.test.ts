import chai from 'chai';
import sinon from "sinon";
import axios from 'axios';
import MarvelService from '../../src/services/marvel.service';

const expect = chai.expect;

describe('Marver services', () => {
    const marvelService = new MarvelService();

    describe("#characters", () => {
        it ('should return empty array if data format is wrong', async () => {
            const stub = sinon.stub(axios, "get").returns(new Promise((resolve) => { resolve('ok') }))
            const res = await marvelService.characters();
            expect(res).to.be.empty
            stub.restore();
        })

        it ('should return list of array if data format is correct', async () => {
            const stub = sinon.stub(axios, "get").returns(new Promise((resolve) => { 
                resolve({
                    data: {
                        data: {
                            results: [
                                {
                                    id: 1
                                },
                                {
                                    id: 2
                                }
                            ]
                        }
                    }
                }) 
            }))
            const res = await marvelService.characters();
            expect(res).to.include.members([1, 2]);
            stub.restore();
        })
    });

    describe("#character", () => {
        it ('should return empty object if data format is wrong', async () => {
            const stub = sinon.stub(axios, "get").returns(new Promise((resolve) => { resolve('ok') }))
            const res = await marvelService.character("1");
            expect(res).to.be.empty
            stub.restore();
        })

        it ('should return object if data format is correct', async () => {
            const stub = sinon.stub(axios, "get").returns(new Promise((resolve) => { 
                resolve({
                    data: {
                        data: {
                            results: [
                                {
                                    id: 1,
                                    name: 'Spiderman',
                                    description: 'Peter Parker'
                                },
                            ]
                        }
                    }
                }) 
            }))
            const res = await marvelService.character("1");
            expect(res).to.include.all.keys('id', 'name', 'description');
            stub.restore();
        })
    })
});