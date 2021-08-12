import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Table, Form, Input, Select, Checkbox, Button ,message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";
const moment = require('moment'); // require


const CustomerDetail = () => {
    const location = useLocation();
    const [customer, setCustomer] = useState();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        debugger;
        setCustomer(location.state.customerDetail);
        console.log(location.state);
    }, []);

    const columns = [
        { title: 'Adres Adı', dataIndex: 'name', key: 'name' },
        { title: 'Adres Tanımı', dataIndex: 'description', key: 'description' },
        { title: 'İlçe', dataIndex: 'county', key: 'county' },
        { title: 'İl', dataIndex: 'province', key: 'province' },
        { title: 'Telefon', dataIndex: 'telephone', key: 'telephone' }


    ];


    let data = customer ? customer.address.map((address, shopIndex) => {
        return ({
            name: address.addressName, province: address.province, telephone: address.telephone,
            description: address.addressDescription, county: address.county,  key: address.id
        })
    }) : [];



    return (
        <Row justify="center">
            <Col xs={24} md={24}>

                {customer && (
                    <Card title={<p><span style={{fontWeight:"bold"}}>{customer.name + ' ' + customer.surname}</span>
                    <span>{' isimli Müşteri Detayı'}</span>
                    </p> }>
                            <div className="gx-module-box-content">
                                <div className="gx-module-box-column">

                                    <Row>
                                        <Col xs={24} md={24}>
                                            <Card style={{paddingLeft:"10px"}} title=" Müşteri Bilgileri">
                                                <p><b>Müşteri Adı : </b>{customer.name}</p>
                                                <p><b>Müşteri Soyadı : </b>{customer.surname}</p>
                                                <p><b>E-posta : </b>{customer.email}</p>
                                                <p><b>Eklenme Tarihi : </b>{customer.dateAdded}</p>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Card title="Adresler">
                                        <Table dataSource={data} columns={columns}>
                                        </Table>
                                    </Card>
                                </div>
                            </div>
                      
                    </Card>
                )}


            </Col>



        </Row>
    );
};
export default CustomerDetail;

