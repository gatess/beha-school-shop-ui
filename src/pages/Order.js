import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import OrderTable from '../components/admin/order/OrderTable';
import { useHistory } from "react-router-dom";

const Order = () => {

    const history = useHistory();
    const [orderListData, setOrderListData] = useState([]);
    const [spinActive, setSpinActive] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
            setSpinActive(true);
            fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/admin/getOrders")
                .then(res => res.json())
                .then(
                    (result) => {
                        debugger;
                        setSpinActive(false);
                        setOrderListData(result);
                        
                    },
                    (error) => {
                        setSpinActive(false);
                        console.log(error);
                        
                    }
                );
    },[]);

    const onOrderDetail = (key) => {
        debugger;
        const orderDetail = orderListData.filter(item => item.orderNumber==key);
        let firstProduct=orderDetail[0];
        console.log(orderDetail);
        history.push({
            pathname: '/admin/order-detail',
            state: { orderDetail: firstProduct }
          });
      }

    return (
        <Row justify="center">
            <Col xs={24} md={24}>
                <Card title="Siparişler">
                <Spin indicator={antIcon} spinning={spinActive} >
                    <div className="gx-module-box-content">
                        <div className="gx-module-box-column">
                        <OrderTable orderDetail={onOrderDetail} orderListData={orderListData} ></OrderTable>  
                        </div>
                       </div>
                       </Spin>
                </Card>
            </Col>



        </Row>
    );
};
export default Order;

