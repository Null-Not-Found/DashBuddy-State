// Importing module
import express, { Application, Request, Response } from 'express';
import { IDashboardDAL } from './DAL interfaces/IDashBoardDAL';
import { DashboardDAL } from './DAL/DashboardDAL';

const PARSER = require('body-parser');
const APP: Application = express();
const PORT: Number = 3500;
const DAL: IDashboardDAL = new DashboardDAL();

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({ extended: true }));

APP.post('/post', async (_req: Request, _res: Response) => {
	const DASHBOARD = await DAL.CreateDashboard(_req.body);

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"Dashboard": DASHBOARD
	});
})

APP.get('/get', async (_req: Request, _res: Response) => {

	const DASHBOARDS = await DAL.GetAllDashboards(); 

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"Dashboards": DASHBOARDS
	});
})

APP.get('/get/:UId', (_req: Request<{ UId: Number }>, _res: Response) => {

	var responseObject: JSON = <JSON><unknown>{
		"UId": _req.params.UId
	};

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"data": responseObject
	});
})

APP.put('/put/:UId', (_req: Request<{ UId: Number }>, _res: Response) => {

	var responseObject: JSON = <JSON><unknown>{
		"UId": _req.params.UId
	};

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"data": responseObject
	});
})

APP.get('/ping', (_req: Request, _res: Response) => {

	_res.status(200).json({
		"status": "Pong!"
	});
})

// Server setup
APP.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})