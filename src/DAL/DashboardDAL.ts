import { JsonObjectExpression } from 'typescript';
import { IDashboardDAL } from '../DAL interfaces/IDashBoardDAL';
import mongoose, { Model } from 'mongoose';
import Dashboard from '../models/Dashboard';
import { IDashboard } from '../Model interfaces/IDashboard';

export class DashboardDAL implements IDashboardDAL{

    public async GetAllDashboards(): Promise<IDashboard[]> {
        
        let dashboards: IDashboard[] = [];

        try {
            await mongoose.connect("mongodb://localhost:4000/DashBuddy-State");
            dashboards = await Dashboard.find({}, '-__v');
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await mongoose.disconnect();
        }

        return dashboards;
    };
    
    public async CreateDashboard(_config: JSON): Promise<IDashboard> {
        let dashboard: IDashboard = {_id: new mongoose.Types.ObjectId() , config: {}};
        
        try {
            await mongoose.connect("mongodb://localhost:4000/DashBuddy-State");
            
            dashboard = await Dashboard.create({_id: new mongoose.Types.ObjectId(), config: _config});

            let newdashboard = await Dashboard.findById(dashboard._id, '-__v');
            if (newdashboard != null)
            {
                dashboard = newdashboard
            }

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