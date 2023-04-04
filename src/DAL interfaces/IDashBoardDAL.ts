import mongoose from "mongoose";

export interface IDashboardDAL
{
    GetAllDashboards(): Promise<[]>;
    CreateDashboard(_config: JSON): Promise<mongoose.Schema>;
}