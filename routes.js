const fs = require('fs');

const requestHandler = (req, res) => {
    //console.log(req.url, req.method, req.headers);
    //to get the path the user is trying to access or if its home page '/'
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write('<body><form action ="/message" method = "POST"><input type="text" name = "message" placeholder = "Message"><button type ="submit"> send</button></body>');
        res.write('<html>');
        return res.end(); //if we male it into the if statement it show quit here buy using retun with res.end() 
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });


    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Home</title></head>');
    res.write('<body>Hello from inside Nodejs</body>');
    res.write('<html>');
    res.end();
}

module.exports = requestHandler;
