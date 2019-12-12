class EquityValidator{
    constructor() {
        this.errorList = new Array();				
    }

    validate(obj){
        obj = (typeof obj !== "object") ? {} : obj;

        this._validateInvestorId(obj.InvestorId);
        this._validatePurchaseId(obj.PurchaseId);
        this._validateAmount(obj.Amount);        

        return this.errorList;
    }

    isValid(){
        return this.errorList.length === 0;
    }

    _validateInvestorId(InvestorId){
        if(InvestorId === null || InvestorId === "" || InvestorId === " ")
            this.errorList.push("Investor ID is mandatory");
    } 

    _validatePurchaseId(PurchaseId){
        if(PurchaseId === null || PurchaseId === "" || PurchaseId === " ")
            this.errorList.push("Purchase ID is mandatory");
    } 

    _validateAmount(Amount){
        if(!Amount > 0)
            this.errorList.push("Amount must be higher than zero");
    }
}
exports.EquityValidator = EquityValidator;