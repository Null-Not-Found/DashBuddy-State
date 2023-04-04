import { JsonObjectExpression } from 'typescript';
import { IDashboardDAL } from '../DAL interfaces/IDashBoardDAL';
import mongoose, { Model } from 'mongoose';
import Dashboard from '../models/Dashboard';

export class DashboardDAL implements IDashboardDAL{

    constructor() {      
        // const dotenv = require('dotenv');
        // dotenv.config();
    }
    
    public async GetAllDashboards(): Promise<[]> {
        
        let dashboards: [] = [];

        try {
            await mongoose.connect("mongodb://localhost:4000/DashBuddy-State");

        }
        catch (e) {
            console.error(e);
        }
        finally {
            await mongoose.disconnect();
        }

        return dashboards;
    };
    
    public async CreateDashboard(_config: JSON): Promise<mongoose.Schema> {
        
        let dashboard = "";
        
        try {
            await mongoose.connect("mongodb://localhost:4000/DashBuddy-State");
            
            dashboard = await Dashboard.create({config: _config});
            
            console.log(_config);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await mongoose.disconnect();
            return dashboard;
        }
    };
    
    
}