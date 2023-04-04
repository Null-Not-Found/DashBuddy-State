import { Dashboard } from "@prisma/client";

export interface IDashboardDAL
{
    GetAllDashboards(): Promise<Dashboard[]>;
    CreateDashboard(_config: string): Promise<void>;
}