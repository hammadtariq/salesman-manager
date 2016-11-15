module.exports = function (app, mongoose) {

    var Schema = mongoose.Schema;

 	var CompanySchema = new Schema({
        salesman: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, //Reference Population
        name: {type: String, required: true},
        lastUpdateAt: {type: Date, default: Date.now()}
    });
    app.db.model('Company', CompanySchema);
}