import React from 'react';
import OrderListItem from "./OrderListItem";



const OrderList  = (props) => {
    const orderItem = props.orderData ?  (props.orderData.map((order,index) =>
    <OrderListItem key={index} order={order}/>)):[];

    return(
       <div style={{paddingTop:10}}>
           {orderItem}
       </div>
    );

}

export default OrderList;