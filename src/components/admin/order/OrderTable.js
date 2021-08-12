import React  from "react";
import { Table  } from 'antd';

const OrderTable = (props) => {
    const columns = [
        { title: 'Sipariş No', dataIndex: 'orderNumber', key: 'orderNumber' },
        { title: 'Müşteri', dataIndex: 'customer', key: 'customer' },
        { title: 'Durumu', dataIndex: 'orderStatus', key: 'orderStatus' },
        { title: 'Tutar', dataIndex: 'orderTotal', key: 'orderTotal' },
        { title: 'Eklenme Tarihi', dataIndex: 'dateAdded', key: 'dateAdded' },
        {
            title: '',
            dataIndex: 'operation',
            render: (text, record) =>
            
              <a onClick={() => getOrderDetail(record.key)}>
              Detay
            </a>
        },
      ];
      const getOrderDetail = key => {
        props.orderDetail(key);
        debugger;
        
      };
      let data = props.orderListData.map((order, shopIndex) => {
        return ({ orderNumber: order.orderNumber,  customer: order.customer,
            orderStatus: order.orderStatusDescription, orderTotal: order.total, key: order.orderNumber,dateAdded : order.createdDate })
       });
  return (
    <Table
    columns={columns}
    dataSource={data}
  />
  )
};

export default OrderTable;
