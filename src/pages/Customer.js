import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import OrderTable from '../components/admin/order/OrderTable';
import { useHistory } from "react-router-dom";
import CustomerTable from '../components/admin/customer/CustomerTable';

const Customer = () => {
    debugger;
    const history = useHistory();
    const [customerListData, setCustomerListData] = useState([]);
    const [spinActive, setSpinActive] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
            setSpinActive(true);
            fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/admin/getCustomers")
                .then(res => res.json())
                .then(
                    (result) => {
                        setSpinActive(false);
                        setCustomerListData(result);
                        
                    },
                    (error) => {
                        setSpinActive(false);
                        console.log(error);
                        
                    }
                );
    },[]);

    const onCustomerDetail = (key) => {
        debugger;
        const customerDetail = customerListData.filter(item => item.id==key);
        let firstProduct=customerDetail[0];
        console.log(customerDetail);
        history.push({
            pathname: '/admin/customer-detail',
            state: { customerDetail: firstProduct }
          });
      }

    return (
        <Row justify="center">
            <Col xs={24} md={24}>
                <Card title="Müşteriler">
                <Spin indicator={antIcon} spinning={spinActive} >
                    <div className="gx-module-box-content">
                        <div className="gx-module-box-column">
                        <CustomerTable getCustomerDetail={onCustomerDetail} customerListData={customerListData} ></CustomerTable>  
                        </div>
                       </div>
                       </Spin>
                </Card>
            </Col>



        </Row>
    );
};
export default Customer;

