import React, { useState  } from "react";
import CustomScrollbars from '../../../util/CustomScrollbars';

import OrderListItem from "./OrderListItem";

const OrderList = (props) => {
    debugger;
  //const [orderId,setOrderId] = useState(null);

  const orderListItems = props.orderData ? props.orderData.map((order,index) =>
  <OrderListItem key={index} order={order}  
   onEditClick ={props.onEditClick}/>) :[];

 
  return (
    <div className="gx-module-list gx-mail-list">
  <CustomScrollbars className="gx-module-content-scroll">      
     {orderListItems}
  </CustomScrollbars>
    </div>
  )
};

export default OrderList;