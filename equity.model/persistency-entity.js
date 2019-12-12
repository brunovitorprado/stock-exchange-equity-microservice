class PersistencyEntity{
    constructor(){
        this.TableName = "";
        this.Item = {
            InvestorId: "",
            PurchaseId: "",
            Amount: 0.0,
        };
    }
}
exports.PersistencyEntity = PersistencyEntity;