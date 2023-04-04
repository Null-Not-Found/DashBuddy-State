import { PrismaClient, Dashboard } from '@prisma/client'
import { JsonObjectExpression } from 'typescript';
import { IDashboardDAL } from '../DAL interfaces/IDashBoardDAL';

export class DashboardDAL implements IDashboardDAL{
    private static PRISMA = new PrismaClient();

    public async GetAllDashboards(): Promise<Dashboard[]>  {
        
        var dashboards: Dashboard[] = [];
        
        try {
            dashboards = await DashboardDAL.PRISMA.dashboard.findMany();
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await DashboardDAL.PRISMA.$disconnect();
        }

        return dashboards;
    };
    
    public async CreateDashboard(_config: string): Promise<void> {
        
        
        try {
            await DashboardDAL.PRISMA.dashboard.create({
                data: {
                    config: _config
                }
            })
            console.log(_config);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await DashboardDAL.PRISMA.$disconnect();
        }
    };
    
    
}