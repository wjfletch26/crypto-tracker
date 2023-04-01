import axios from 'axios'

// export const getCryptoMarketData = () => {
//     let response = null;
//     new Promise(async (resolve, reject) => {
//         try {
//             response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
//                 headers: {
//                     'X-CMC_PRO_API_KEY': '1e2c60c9-b98b-4287-8a1d-8f11a4ce100d',
//                 },
//             });
//         } catch (err) {
//             response = null;
//             // error
//             console.log(err);
//             reject(err);
//         }
//         if (response) {
//             // success
//             const json = response.data;
//             console.log(json);
//             resolve(json);
//         }
//     });
// }

export function getCryptoMarketData() {
    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {
                    'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
                },
            });
        } catch (ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            console.log(json);
            resolve(json);
        }
    });
}

