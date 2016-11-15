/// <reference path='../../../typings/tsd.d.ts' />

module.exports = function (app, mongoose, Q) {
    require('./db')(app, mongoose, Q);
};
/*

 var productSchema = new moongoose.Schema({ // _id will be assign by mongoose
 productTitle: String,
 productDescription: String,
 productCategories: [String],
 productPrice: Number,
 productQuantity: Number,
 productManufutureBy: String
 })

 */






/*

 var productSchema = new moongoose.Schema({ // _id will be assign by mongoose
 productTitle: String,
 productDescription: String,
 productCategories: [String],
 productPrice: Number,
 productQuantity: Number,
 productManufutureBy: String
 })



 var creditCardDetailSchema = new mongoose.Schema({
 creditCardNumer: Number,
 expiryDate: Date,
 name: String,
 address: String,
 pinCode: Number,
 })

 var customerSchema = new mongoose.Schema({
 customerFirstName: String,
 customerLastName: String,
 customerAddress: [String],
 customerEmail: String,
 customerContact: String,
 customerCreditCard: [creditCardDetailSchema]
 })

 var itemSchema = new mongoose.Schema({
 product: {type: moongoose.Schema.Types.ObjectId, ref: "Product"}, //Reference Population
 quantity: Number,
 price: Number
 })

 var shoppingCart = new mongoose.Schema({ // Temporary Indexing for Order and will be deleted when order placed
 customer: {type: moongoose.Schema.Types.ObjectId, ref: "Customer"}, //Reference Population
 item: [itemSchema], //Sub Document
 lastUpdateDate: Date
 })

 var orderSchema = new mongoose.Schema({
 customer: {type: moongoose.Schema.Types.ObjectId, ref: "Customer"}, //Reference Population
 orderDate: Date,
 orderExpectedShipDate: Date,
 orderShipDate: Date,
 item: [itemSchema], //Sub Document
 payment: {type: moongoose.Schema.Types.ObjectId, ref: "Payment"}, //Reference Population
 })

 var paymentSchema = new mongoose.Schema({
 customer: {type: moongoose.Schema.Types.ObjectId, ref: "Customer"}, //Reference Population
 order: {type: moongoose.Schema.Types.ObjectId, ref: "Order"}, //Reference Population
 creditCard: creditCardDetailSchema, // Sub Docment
 amount: Number,
 transactionDate: Date
 })

 var productOnOrderSchema = new mongoose.Schema({
 productId: {type: moongoose.Schema.Types.ObjectId, ref: "Product"}, //Reference Population
 expectedDate: Date,
 quantitiy: Number,
 supplier: {
 name: String,
 address: String,
 contact: String
 }
 })







 middleware runs everytime
 routing runs on specific url

 */