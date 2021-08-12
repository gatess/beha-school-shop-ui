import React, { useState, useRef, useEffect } from 'react';

var Iyzipay = require('iyzipay');

export const sendPaymentForm = (shopCart , totalPrice , customerInformation) =>{
    debugger;
    let iyzipay = new Iyzipay({
        apiKey: 'sandbox-MsGo1gMqJuiEuLJ73ljZOPkSdD6JGMxH',
        secretKey: 'sandbox-i7gvGCcLxTxmEiX60sJrY3LFUq1m10Yt',
        uri: 'https://sandbox-api.iyzipay.com'
    });

    let basketItems = shopCart.map(cart =>{
        return {
            id: cart.key,
            name: cart.productName,
            category1: 'Kırtasiye',
            category2: 'Kırtasiye',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: cart.price*cart.quantity
        };
    })
    
    let request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: totalPrice,
        paidPrice: totalPrice,
        currency: Iyzipay.CURRENCY.TRY,
        installment: '1',
        basketId: 'B67832',
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,

        buyer: {
            id: 'BY789',
            name: customerInformation.studentName,
            surname: customerInformation.studentName,
            gsmNumber: customerInformation.phone,
            email: customerInformation.email,
            identityNumber: '',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: customerInformation.addressDescription,
            ip: '85.34.78.112',
            city: customerInformation.city,
            country: 'Turkey',
            zipCode: customerInformation.zipCode
        },
        shippingAddress: {
            contactName: customerInformation.studentName,
            city: customerInformation.city,
            country: 'Turkey',
            address: customerInformation.addressDescription,
            zipCode: customerInformation.zipCode
        },
        billingAddress: {
            contactName: customerInformation.studentName,
            city: customerInformation.city,
            country: 'Turkey',
            address: customerInformation.addressDescription,
            zipCode: customerInformation.zipCode
        },
        basketItems: basketItems
    };
    
    iyzipay.payment.create(request, function (err, result) {
        console.log(err, result);
        //done();
    });
}

