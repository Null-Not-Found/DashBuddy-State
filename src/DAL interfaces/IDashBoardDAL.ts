import mongoose from "mongoose";
import Dashboard from "../models/Dashboard";

export interface IDashboardDAL
{
    GetAllDashboards(): Promise<typeof Dashboard[]>;
    CreateDashboard(_config: JSON): Promise<any>;
}