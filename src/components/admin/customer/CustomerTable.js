import React  from "react";
import { Table  } from 'antd';

const CustomerTable = (props) => {
    const columns = [
        { title: 'Müşteri Adı', dataIndex: 'customerName', key: 'customerName' },
        { title: 'Müşteri Soyadı', dataIndex: 'customerSurname', key: 'customerSurname' },
        { title: 'Eposta', dataIndex: 'email', key: 'email' },
        { title: 'Eklenme Tarihi', dataIndex: 'dateAdded', key: 'dateAdded' },
        {
            title: '',
            dataIndex: 'operation',
            render: (text, record) =>
            
              <a onClick={() => getCustomerDetail(record.key)}>
              Detay
            </a>
        },
      ];
      const getCustomerDetail = key => {
        props.getCustomerDetail(key);
        debugger;
        
      };
      let data = props.customerListData.map((customer, shopIndex) => {
        return ({ customerName: customer.name,  customerSurname: customer.surname,
            email: customer.email, key: customer.id,dateAdded : customer.createdDate })
       });
  return (
    <Table
    columns={columns}
    dataSource={data}
  />
  )
};

export default CustomerTable;
