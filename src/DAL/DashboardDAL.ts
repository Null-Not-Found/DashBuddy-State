import { IDashboardDAL } from '../DAL interfaces/IDashBoardDAL';
import mongoose from 'mongoose';
import Dashboard from '../models/Dashboard';
import { IDashboard } from '../Model interfaces/IDashboard';
import 'dotenv/config'

export class DashboardDAL implements IDashboardDAL{
    private DBstring: string = process.env.DATABASE_URL || "";

    public async GetAllDashboards(): Promise<IDashboard[]> {
        
        let dashboards: IDashboard[] = [];

        try {
            await mongoose.connect(this.DBstring);
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
            await mongoose.connect(this.DBstring);
            
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

    public async UpdateDashboard(_dashId: String, _config: JSON): Promise<boolean> {
        let result: boolean = false;
        
        try {
            await mongoose.connect(this.DBstring);
            
            await Dashboard.updateOne({ _id: _dashId }, {config: _config }).then((mongoResult) =>
            {
                result = mongoResult.acknowledged;
            });

        }
        catch (e) {
            console.error(e);
        }
        finally {
            await mongoose.disconnect();
            return result;
        }
    };
}