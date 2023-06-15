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
  
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

    it('should return "DId": "6475e2a6d0b8444f4981ca4c" with status code 200', async () => {
        sandbox.stub(DashboardDAL.prototype, 'CreateDashboard').callsFake(async () => { return new mongoose.Types.ObjectId("6475e2a6d0b8444f4981ca4c"); });

        chai.request(APP).post('/post').send().end( (res) => {
            
            expect(res).to.have.status(200);
        
            expect(res.body).to.have.property('DId');
            expect(res.body.DId).to.equal("6475e2a6d0b8444f4981ca4c");
        });
  });

    it('should return "Error": "Dashboard could not be created" with status code 400', async () => {
        sandbox.stub(DashboardDAL.prototype, 'CreateDashboard').callsFake(async () => { return null });

        chai.request(APP).post('/post').send().end( (res) => {

            expect(res).to.have.status(400);

            expect(res.body).to.have.property('Error');
            expect(res.body.Error).to.equal("Dashboard could not be created");
        });
  });
})

describe('/put endpoint', () => {

    let sandbox = sinon.createSandbox();
    
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

  
    it('should return "Status": "Succeeded" with status code 200', async () => {
        sandbox.stub(DashboardDAL.prototype, 'UpdateDashboard').callsFake(async () => { return true });

        chai.request(APP).put('/put/6475e2a6d0b8444f4981ca4c').send(JSON.parse('{"config": {"Bingo":"Bongo"}}')).end((res) => {
            expect(res).to.have.status(200);

            expect(res.body).to.have.property("Status");
            expect(res.body.Status).to.equal("Succeeded");
        });
    });

    it('should return "Status": "Failed" with status code 400', async () => {
        sandbox.stub(DashboardDAL.prototype, 'UpdateDashboard').callsFake(async () => { return false });

        chai.request(APP).put('/put/6475e2a6d0b8444f4981ca4c').send(JSON.parse('{"config": {"Bingo":"Bongo"}}')).end((res) => {
            expect(res).to.have.status(400);

            expect(res.body).to.have.property("Status");
            expect(res.body.Status).to.equal("Failed");
        });
    });
})

describe('/ping endpoint', () => {
  
    it('should return "status": "Pong!" with 200 status code', async () => {
      const res = await chai.request(APP).get('/ping');

      expect(res).to.have.status(200);

      expect(res.body).to.have.property("Status");
      expect(res.body.Status).to.equal("Pong!");
    });
})