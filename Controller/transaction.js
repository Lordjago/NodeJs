const https = require('https')

exports.transactInit = (req, res, next) => {
    // const email = req.body.email;
    // const amount = req.body.amount;
    // console.log(email)
    // console.log(amount)
    const params = JSON.stringify({
        "email": "adegokeabdulazeez653@gmail.com",
        "amount": "5000000",
        "callback_url": "http://localhost:3000/order",
        "metadata": {
            "cancel_action": "http://localhost:3000/checkout"
        }
    })
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: 'Bearer sk_test_47c4fa53ab7cdc8f0c81f9b32c86d2f560525b25',
            'Content-Type': 'application/json'
        },
        // csurf: "csrf-token"
    }
     req = https.request(options, res => {
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        });
        res.on('end', () => {
            console.log(JSON.parse(data))
        //     let js = JSON.parse(data);
        //     let props = Object.keys(js);

        //    let result = props.map(function (prop) {
        //          js[prop].authorization_url
        //     });
            
        })
    })
    .on('error', error => {
        console.error(error)
    })
    req.write(params)
    req.end()
}

exports.verifyTransact = (req, res) => {
    const https = require('https')
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/verify/:reference',
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_test_47c4fa53ab7cdc8f0c81f9b32c86d2f560525b25'
        }
    }
    https.request(options, res => {
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        });
        res.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })
}

exports.getTransact = (req, res) => {
    const https = require('https')
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction',
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_test_47c4fa53ab7cdc8f0c81f9b32c86d2f560525b25'
        }
    }
    https.request(options, res => {
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        });
        res.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })
}

exports.transactById = (req, res) => {
    const https = require('https')
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/:id',
        method: 'GET',
        headers: {
            Authorization: 'Bearer sk_test_47c4fa53ab7cdc8f0c81f9b32c86d2f560525b25'
        }
    }
    https.request(options, res => {
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        });
        res.on('end', () => {
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })
}