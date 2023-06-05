import chai from "chai";
import chaiHttp from "chai-http"
import { APP } from "../src/server";
import sinon from "sinon";
import { DashboardDAL } from "../src/DAL/DashboardDAL";
import mongoose from "mongoose";

const expect = chai.expect;
require("dotenv").config();
chai.use(chaiHttp);

describe('/post endpoint', () => {

  let sandbox = sinon.createSandbox();
  process.env.DNS = undefined;
  
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  } )

  it('should return "DId": "N3v3rG0nn4G1v3Y0uUp" with status code 200', async () => {
    sandbox.stub(DashboardDAL.prototype, 'CreateDashboard').callsFake(async () => { return new mongoose.Types.ObjectId("N3v3rG0nn4G1v3Y0uUp"); });
    // Make a request to the /post endpoint
    chai.request(APP).post('/post').send().end( (res) => {
        // Check the response status code
        expect(res).to.have.status(200);
    
        // Check the response body
        expect(res.body).to.have.property('DId');
        expect(res.body.DId).to.equal("N3v3rG0nn4G1v3Y0uUp");
    });
  });

  it('should return "Error": "Dashboard could not be created" with status code 400', async () => {
    sandbox.stub(DashboardDAL.prototype, 'CreateDashboard').callsFake(async () => { return null });
    // Make a request to the /post endpoint
    chai.request(APP).post('/post').send().end( (res) => {
        // Check the response status code
        expect(res).to.have.status(400);
    
        // Check the response body
        expect(res.body).to.have.property('Error');
    });
  });
})

describe('/ping endpoint', () => {
  
    it('should return "status": "Pong!" with 200 status code', async () => {
      const res = await chai.request(APP).get('/ping');

      expect(res).to.have.status(200);

      expect(res.body).to.have.property("status");
    });
  })