const http = require('http');
const fs = require('fs');

const data = JSON.stringify({
    name: 'Test User',
    email: 'test' + Date.now() + '@example.com',
    password: 'password123',
    role: 'user'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/signup',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log('BODY length:', body.length);
        fs.writeFileSync('signup_error.json', body);
        console.log('Error saved to signup_error.json');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
