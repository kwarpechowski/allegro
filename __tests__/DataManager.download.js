import DataManager from '../static/DataManager';

test('calls to api', async () => {
    fetch.mockResponseOnce(JSON.stringify([1,2,3]));

    const instance = new DataManager({url: 'test.pl'});
    await instance.download(x => x);

    expect(instance.json.length).toBe(3);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('test.pl')
});