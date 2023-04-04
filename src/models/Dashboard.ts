import mongoose from 'mongoose';

const DASHBOARDSCHEMA = new mongoose.Schema({
    id: String,
    config: {}
})

export default mongoose.model("Dashboard", DASHBOARDSCHEMA)