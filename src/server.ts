// Importing module
import express, { Application, Request, Response } from 'express';

const bp = require('body-parser');
const app: Application = express();
const PORT: Number = 3500;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Handling post / Request
app.post('/repeat', (req: Request, res: Response) => {
	res.status(200).json({
		"Time": new Date().toUTCString(),
		//get specific prop
		"abc": req.body["text"],
		//get whole body (obvious)
		"body": req.body
	});
})

// /:id to set the path and <{ id: Number }> to set id as a actual parameter
app.get('/repeat/:id', (req: Request<{ id: Number }>, res: Response) => {
	res.status(200).json({
		"Time": new Date().toUTCString(),
		//read param
		"Id": req.params.id
	});
})

// Server setup
app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})
