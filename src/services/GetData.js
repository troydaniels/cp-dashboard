const GetData = (url, data) => {
    return fetch(url, {
        method: 'GET',
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw Error(response.statusText);
            }
        })
        .catch(error => console.error(error));
};

export default GetData;
