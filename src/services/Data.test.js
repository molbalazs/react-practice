import { getRepositories, getCommits } from './Data';

describe('getRepositories', () => {
    const testUrl = 'test';

    it('calls the given endpoint', async () => { 
        const mockFetchPromise = Promise.resolve({ ok: false });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        
        getRepositories(testUrl);
  
        expect(global.fetch).toHaveBeenCalledWith(testUrl);
    });

    it('throws an error when response is not ok: true', async () => { 
        const mockFetchPromise = Promise.resolve({
            ok: false,
            statusText: 'testError' });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        expect(getRepositories(testUrl)).rejects.toThrow('testError');
    });

    it('returns the json', async () => {
        const NAME_TEST = 'test name string';
        const URL_TEST = 'test url';

        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => [{
                full_name: NAME_TEST,
                commits_url: URL_TEST
            }]
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        let actual = await getRepositories(testUrl);
        expect(actual[0].name).toBe(NAME_TEST);
        expect(actual[0].commitsUrl).toBe(URL_TEST);
    });

    it('returns the url before the { character', async () => {
        const ACTUAL_URL = 'test url { this part must not be here.';
        const EXPECTED_URL = 'test url ';

        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => [{ commits_url: ACTUAL_URL }]
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        let actual = await getRepositories(testUrl);
        expect(actual[0].commitsUrl).toBe(EXPECTED_URL);
    });
});

describe('getCommits', () => {
    const testUrl = 'test';

    it('calls the given endpoint', async () => { 
        const mockFetchPromise = Promise.resolve({ ok: false });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        
        getCommits(testUrl);
  
        expect(global.fetch).toHaveBeenCalledWith(testUrl);
    });

    it('throws an error when response is not ok: true', async () => { 
        const mockFetchPromise = Promise.resolve({ ok: false });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        expect(getCommits(testUrl)).rejects.toThrow();
    });

    it('throws an error when response.message: "Not Found"', async () => { 
        const mockFetchPromise = Promise.resolve({
            ok: true,
            message: 'Not Found'
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        expect(getCommits(testUrl)).rejects.toThrow();
    });
});