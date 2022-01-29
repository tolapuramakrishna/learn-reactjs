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
								<form action="/message" method="POST">
										<input type="text" name="message"/>
										<button type="SUBMIT">send</button>
								</form>
						</body>
				</html>
    `)
		return res.end()
	}
	if (url === '/message' && method === "POST") {
		fs.writeFileSync('message.txt', 'message');
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