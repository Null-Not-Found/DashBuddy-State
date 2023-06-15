# DashBuddy-State


## Description
Microservice for saving the state of a user dashboard

## Requirements
- The DNS is running.
- Have a MongoDB database running with a collection named "dashboards"
- Make sure to add environment variables file (.env) in the root of the project with the following properties:
```sql
# url of the Mongo database
DATABASE_URL="mongodb://localhost:4000/DashBuddy-State"
# port where this app will be accessible
PORT=5000
# url of the DNS
DNS="http://127.0.0.1:3001/register"
```
## Startup
Then run the following commands:
```sql
# install all packages
$ npm install

# then create build
$ npm run build

# then start app
$ npm run start
```
