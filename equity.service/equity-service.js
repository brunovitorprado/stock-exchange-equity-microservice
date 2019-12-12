const request = require('request');
const urls = require('../equity.urls/equity.urls');
const models = require('../equity.model/persistency-entity');
const valid = require('../equity.validators/equity-validator');

class EquityService{

    constructor(){
    }

    getEquity(done){
        this._getRequest(done, urls.url.EQUITY);
    }

    increaseEquity(data, done){
        let validator = new valid.EquityValidator();
        let errors = validator.validate(data);

        if(validator.isValid()){
            let entity = this._prepareEntity(data);
            this._postRequest(entity, done, urls.url.INCREASE);
        }else{done({Message:"Here are some validation errors", Errors: errors}, null)}
    }

    decreaseEquity(data, done){
        let validator = new valid.EquityValidator();
        let errors = validator.validate(data);

        if(validator.isValid()){
            let entity = this._prepareEntity(data);
            this._postRequest(entity, done, urls.url.DECREASE);
        }else{done({Message:"Here are some validation errors", Errors: errors}, null)}
    }

    _getRequest(done, url){
        
        request.get(url, function (req, res) {
            done(null, res.body)
            console.log(res);
        })
    }
    
    _postRequest(data, done, url){

        request.post({
            url: url,
            headers: {
              'Content-Type': 'application/octet-stream'
            },
            encoding: null,
            responseType: 'buffer',
            body: data,
            json: true
          }, (err, res, body) => {
            if (!err) {
                  done(null, body);
              } else {
                  done(err, null);
              }
          }
        );        
    }

    _prepareEntity(data){
        let entity = new models.PersistencyEntity();
        entity.TableName = "InvestorEquity";
        entity.Item = data;

        return entity;    
    }
}
exports.EquityService = EquityService;