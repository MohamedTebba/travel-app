const getData = async url => {

    const res = await fetch(url)
    try {
        
        const data = await res.json()
        // console.group('data')
        // //     // console.log(data.postalCodes[0].lng)
        // //     // console.log(data.postalCodes[0].lat)
        // //     // console.log(data.postalCodes[0].countryCode)
        //     console.log(data)
        // console.groupEnd()
        return data



        //     const expectedHit = data.hits.filter(hit => hit.tags.includes('madrid'))
        //     console.log(expectedHit)
        //     console.groupEnd()
        //     const index = Math.round(Math.random() * expectedHit.length)
        //     console.log(index)

        // return expectedHit[index].webformatURL

    } catch (error) {
        console.log( `we coudn't reach the server to get the data with `,error)
        
    }
    
};

const postData = async (url = "", data = {}) => {
    
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
        response.json()
            .then((data) => {
                console.log(data)
                return data
            })
            .catch((err) => {
                alert(`we coudn't reach the server to post the data`)
                console.log(`we coudn't reach the server to post the data`, err)
            })
};

export {getData, postData}