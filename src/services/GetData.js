const GetData = (url, data) => {
    return fetch(url, {
        method: 'GET',
        body: JSON.stringify(data),
    });
};

export default GetData;
