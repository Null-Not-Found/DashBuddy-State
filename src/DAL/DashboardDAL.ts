import { IDashboardDAL } from '../DAL interfaces/IDashBoardDAL';
import mongoose from 'mongoose';
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
    
    public async CreateDashboard(): Promise<mongoose.Types.ObjectId | null> {
        let dashboardId: mongoose.Types.ObjectId | null = null;
        
        try {
            await mongoose.connect("mongodb://localhost:4000/DashBuddy-State");
            
            let dashboard = await Dashboard.create({_id: new mongoose.Types.ObjectId()});
            dashboardId = dashboard._id;

        }
        catch (e) {
            console.error(e);
        }
        finally {
            await mongoose.disconnect();
            return dashboardId;
        }
    };
}