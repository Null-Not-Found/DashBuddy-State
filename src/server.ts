// Importing module
import express, { Application, Request, Response } from 'express';

const bp = require('body-parser');
const app: Application = express();
const PORT: Number = 3500;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.post('/', (req: Request, res: Response) => {
	res.status(200).json({
		"Time": new Date().toUTCString()
	});
})

app.get('/:UId', (req: Request<{ UId: Number }>, res: Response) => {

	var responseObject: JSON = <JSON><unknown>{
		"UId": req.params.UId
	};

	res.status(200).json({
		"Time": new Date().toUTCString(),
		"data": responseObject
	});
})

app.put('/:UId', (req: Request<{ UId: Number }>, res: Response) => {

	var responseObject: JSON = <JSON><unknown>{
		"UId": req.params.UId
	};

	res.status(200).json({
		"Time": new Date().toUTCString(),
		"data": responseObject
	});
})

// Server setup
app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})
