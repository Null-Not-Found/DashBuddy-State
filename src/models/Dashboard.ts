import mongoose from 'mongoose';
import { IDashboard } from '../Model interfaces/IDashboard';

const DASHBOARDSCHEMA = new mongoose.Schema<IDashboard>({
    _id: mongoose.Types.ObjectId,
    config: {}
})

export default mongoose.model("Dashboard", DASHBOARDSCHEMA)