import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
 userId : {
  type : String,
  required : true
 },
  items : {
  type : String,
  required : true
 },
 amount : {
  type : Number,
  required : true
 },
 status : {
  type : String,
  default : "Food Processing"
 },
 date : {
  type : Date,
  default : Date.now()
 },
 paymentMethod : {
  type : Boolean,
  default : false
 },
 address : {
  type : Object,
  required : true
 }
}) 
 

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel