'use strict';
const _ = require("lodash")
const Promise = require("bluebird")
module.exports = function(Transaction) {
  Transaction.types = {
    AdminTransferCoinToSeller: "AdminTransferCoinToSeller",
    SellerTransferCoinToSeller: "SellerTransferCoinToSeller",
    SellerTransferCoinToPlayer: "SellerTransferCoinToPlayer",
    AdminGenerateCoin: "generateCoin"
  }
  Transaction.createAdminTransferCoinToSeller = async function(sourceId,destinationId,coin){
    let trans = await Transaction.create({
      transactionType:Transaction.types.AdminTransferCoinToSeller,
      sourceId,destinationId,coin
    })
    return trans;
  }
  Transaction.SellerTransferCoinToSeller = async function(sourceId,destinationId,coin){
    let trans = await Transaction.create({
      transactionType:Transaction.types.SellerTransferCoinToSeller,
      sourceId,destinationId,coin
    })
    return trans;
  }
  Transaction.SellerTransferCoinToPlayer = async function(sourceId,destinationId,coin){
    let trans = await Transaction.create({
      transactionType:Transaction.types.SellerTransferCoinToPlayer,
      sourceId,destinationId,coin
    })
    return trans;
  }
  Transaction.AdminGenerateCoin = async function(sourceId,coin){
    let trans = await Transaction.create({
      transactionType:Transaction.types.AdminGenerateCoin,
      sourceId,sourceId,coin
    })
    return trans;
  }

  Transaction.prototype.pending = async function(){
    this.state = 'pending'
    await this.save()
    return this;
  }
  Transaction.prototype.commit = async function(){
    this.state = 'commit';
    await this.save()
    return this;
  }
  Transaction.prototype.done = async function(){
    this.state = 'done';
    await this.save()
    return this;
  }
  Transaction.prototype.canceling = async function(){
    this.state = 'canceling';
    await this.save()
    return this;
  }
  Transaction.prototype.canceled = async function(){
    this.state = 'canceled';
    await this.save()
    return this;
  }
};
