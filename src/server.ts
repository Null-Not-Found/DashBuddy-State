// Importing module
import { Dashboard } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
import { GetAllDashboards } from './DAL/DashboardDAL';

const bp = require('body-parser');
const app: Application = express();
const PORT: Number = 3500;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.post('/', (_req: Request, _res: Response) => {
	_res.status(200).json({
		"Time": new Date().toUTCString()
	});
})

app.get('/', async (_req: Request, _res: Response) => {

	const DASHBOARDS: Dashboard[] = await GetAllDashboards(); 

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"data": DASHBOARDS
	});
})

app.get('/:UId', (_req: Request<{ UId: Number }>, _res: Response) => {

	var responseObject: JSON = <JSON><unknown>{
		"UId": _req.params.UId
	};

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"data": responseObject
	});
})

app.put('/:UId', (_req: Request<{ UId: Number }>, _res: Response) => {

	var responseObject: JSON = <JSON><unknown>{
		"UId": _req.params.UId
	};

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"data": responseObject
	});
})

// Server setup
app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})
