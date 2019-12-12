const test = require('tape')
const valid = require('../equity.validators/equity-validator');
const models = require('../equity.model/investor-equity');

test('Test validattion has error messages', (t) => {
    let model = new models.InvestorEquity();
    let vldt = new valid.EquityValidator();

    t.assert(vldt.validate(model).length === 3, "Validates perfectly! Well done!");
    t.end();
})

test('Test equity is valid() = false', (t) => {
    let model = new models.InvestorEquity();
    let vldt = new valid.EquityValidator();
    vldt.validate(model);

    t.assert(vldt.isValid() == false, "Validates perfectly! You rock!");
    t.end();  
})

test('Test equity is valid() = true', (t) => {
    let model = new models.InvestorEquity();
    model.InvestorId = "8943t09";
    model.PurchaseId = "f5-tf5t-few";
    model.Amount = 200;

    let vldt = new valid.EquityValidator();
    vldt.validate(model);
    
    t.assert(vldt.isValid() == true, "Validates perfectly! You made my day!");
    t.end();  
})