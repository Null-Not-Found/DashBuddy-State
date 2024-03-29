// Importing module
import express, { Application, Request, Response } from 'express';
import { IDashboardDAL } from './DAL interfaces/IDashBoardDAL';
import { DashboardDAL } from './DAL/DashboardDAL';
import 'dotenv/config'

const PARSER = require('body-parser');
const PORT: Number = Number(process.env.PORT) || 3500;
const DAL: IDashboardDAL = new DashboardDAL();

export const APP: Application = express();

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({ extended: true }));

var cors = require('cors');
APP.use(cors());

fetch(process.env.DNS || "", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		"microservice": "state",
		"port": PORT
	}),
})

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
	console.log("ping")
	_res.status(200).json({
		"Status": "Pong!"
	});
})

// Server setup
APP.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})