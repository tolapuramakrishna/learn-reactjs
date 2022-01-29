const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	const url = req.url
	const method = req.method
	if (url === '/') {
		res.write(`
				<html>
						<head><title>Node js </title></head>
						<body>
                <h1> Hello there</h1>
								<form action="/create-user" method="POST">
									<input type="text" name="username"/>
									<button type="SUBMIT">send</button>
								</form>
						</body>
				</html>
    `);
		return res.end()
	}
	if (url === '/users') {
		res.write(`
			<html>
				<head><title>Node js </title></head>
				<body>
				<ul>
	`);
		['user1', 'user2'].forEach((item) => {
			res.write(`<li>${item}</li>`)
		})
		res.write(`
			</ul>
				</body>
				</html>
    `);
		return res.end();
	}
	if (url === '/create-user' && method === "POST") {
		const body = [];
		req.on('data', (chunk) => {
			console.log(chunk);
			body.push(chunk);
		});
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const username = parsedBody.split('=')[1];
			console.log(username)
		});
		res.statusCode = 302;
		res.setHeader('Location', '/');
		return res.end();
	}
	res.setHeader('Content-Type', 'text/html')
	res.write(`
    <html>
        <head><title>Node js </title></head>
        <body>
           Welcome to node js server
        </body>
    </html>
    `)
	res.end();

})

server.listen(3001)