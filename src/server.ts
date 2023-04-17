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
	const DASHBOARDID = await DAL.CreateDashboard();

	if (DASHBOARDID == null)
	{
		_res.status(400).json({
			"Time": new Date().toUTCString(),
			"Error": "Dashboard could not be created"
		});

		return;
	}

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"DId": DASHBOARDID
	});
})

APP.put('/put/:DId', async (_req: Request<{ DId: string }>, _res: Response) => {

	const UPDATERESULT = await DAL.UpdateDashboard(_req.params.DId, _req.body["config"]);

	if (UPDATERESULT == false)
	{
		_res.status(400).json({
			"Time": new Date().toUTCString(),
			"Status": "Failed"
		});

		return;
	}

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"Status": "Succeeded"
	});
})

APP.get('/get', async (_req: Request, _res: Response) => {

	const DASHBOARDS = await DAL.GetAllDashboards(); 

	_res.status(200).json({
		"Time": new Date().toUTCString(),
		"Dashboards": DASHBOARDS
	});
})

APP.get('/get/:DId', (_req: Request<{ UId: Number }>, _res: Response) => {

	var responseObject: JSON = <JSON><unknown>{
		"DId": _req.params.UId
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