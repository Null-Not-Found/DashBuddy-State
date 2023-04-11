import mongoose from "mongoose";
import Dashboard from "../models/Dashboard";
import { IDashboard } from "../Model interfaces/IDashboard";

export interface IDashboardDAL
{
    GetAllDashboards(): Promise<IDashboard[]>;
    CreateDashboard(_config: JSON): Promise<IDashboard>;
}