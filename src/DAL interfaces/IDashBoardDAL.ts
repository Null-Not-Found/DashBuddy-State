import mongoose from "mongoose";
import { IDashboard } from "../Model interfaces/IDashboard";

export interface IDashboardDAL
{
    GetAllDashboards(): Promise<IDashboard[]>;
    CreateDashboard(): Promise<mongoose.Types.ObjectId | null>;
    UpdateDashboard(_dashId: String, _config: JSON): Promise<boolean>;
}