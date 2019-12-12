const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const service = require('./equity.service/equity-service');

const port = 3001;
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.use(express.json());

  //Get equity endpoint  
  app.get('/equity', (req, res) => {
    let srv = new service.EquityService();
    const done = (err, resp) => {
        if(!err){
            res.send(resp)
        }else{
            res.send({"Message":"An error ocurred"})
        }
    };
    console.log(typeof(done));
    srv.getEquity(done);
  });

   //Equity increase endpoint
   app.post('/equity/increase', (req, res) => {
    console.log("Receiving request=====>");
    console.log(req.body)
    let srv = new service.EquityService();
    const done = (err, resp) => {
        if(!err){
            res.send(resp)
            res.end()
        }else{
            res.send(err)
            res.end()
        }
    };
    srv.increaseEquity(req.body, done)
  });

     //Equity decrease endpoint
     app.post('/equity/decrease', (req, res) => {
        console.log("Receiving request=====>");
        let srv = new service.EquityService();
        const done = (err, resp) => {
            if(!err){
                res.send(resp)
                res.end()
            }else{
                res.send(err)
                res.end()
            }
        };
        srv.decreaseEquity(req.body, done)
      });

app.listen(port, () => {
    console.log("Server running on port 3001");
});