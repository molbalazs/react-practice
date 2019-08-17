import {getRepositories} from './Data';

describe('getRepositories', () => {
    it('Returns an array', () =>  {
        //console.log(JSON.parse(data));
        const actual = getRepositories();
        expect(actual.then(Array.isArray)).resolves.toBeTruthy();
    });

})