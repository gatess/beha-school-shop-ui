import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Table, Form, Input, Select, Checkbox, Button ,message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";
const moment = require('moment'); // require

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;

const OrderDetail = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const [spinActiveOrderHistory, setSpinActiveOrderHistory] = useState(false);
    const [order, setOrder] = useState();
    const [orderHistoryData, setOrderHistoryData] = useState([]);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }

    };

    useEffect(() => {
        debugger;
        setOrder(location.state.orderDetail);
        console.log(location.state);
        prepareOrderHistoryData(location.state.orderDetail);
    }, []);

    const prepareOrderHistoryData = (currentOrder) => {
        debugger;
        let tempOrderHistoryData = currentOrder ? currentOrder.orderHistoryList.map((orderDetail, shopIndex) => {
            return ({
                createdDate: moment(orderDetail.createdDate).format('DD/MM/YYYY'),
                comment: orderDetail.comment, status: orderDetail.orderStatus.description, customerNotice: orderDetail.notice === true ? 'Var' : 'Yok', key: orderDetail.id
            })
        }) : [];
        setOrderHistoryData(tempOrderHistoryData);
    }



    const columns = [
        { title: 'Ürün Adı', dataIndex: 'name', key: 'name' },
        { title: 'Fiyat', dataIndex: 'price', key: 'price' },
        { title: 'Adet', dataIndex: 'quantity', key: 'quantity' }


    ];

    const orderHistoryStatusDescriptions = [
        { title: 'Sipariş Teslim Edildi', value: '0' },
        { title: 'Ödeme Tamamlandı', value: '1' },
        { title: 'Geri Ödendi', value: '2' },
        { title: 'İptal edildi', value: '3' },
        { title: 'Paket Hazırlanıyor', value: '4' },
        { title: 'Geçersiz', value: '5' },
        { title: 'Ödeme Bekleniyor', value: '6' },
        { title: 'Kargoya Teslim Edildi', value: '7' },
        { title: 'Paket Hazır/Mağazada Bekliyor', value: '8' },
        { title: 'Ödeme Alınamadı', value: '9' }
    ];


    const orderHistoryColumns = [
        { title: 'Ekleme Tarihi', dataIndex: 'createdDate', key: 'createdDate' },
        { title: 'Açıklama', dataIndex: 'comment', key: 'comment' },
        { title: 'Durumu', dataIndex: 'status', key: 'status' },
        { title: 'Müşteri Bildirimi', dataIndex: 'customerNotice', key: 'customerNotice' }


    ];

    let data = order ? order.orderDetailList.map((orderDetail, shopIndex) => {
        return ({
            name: orderDetail.product.name,
            quantity: orderDetail.quantity, price: orderDetail.price, key: orderDetail.product.barcode
        })
    }) : [];

    const handleSubmit = (formValues) => {
        setSpinActiveOrderHistory(true);
        debugger;
        fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/admin/add-order-history/", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formValues, orderId: order.orderNumber })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.status === 's') {
                        setSpinActiveOrderHistory(false);
                        debugger;
                        message.success('Sipariş Geçmişi Başarıyla Eklendi');
                        let tempOrder = order;
                        let tempHistoryList = order.orderHistoryList;
                       let historyToAdd = {
                            createdDate: new Date(),
                            orderStatus: {
                                value: formValues.status,
                                description: orderHistoryStatusDescriptions.filter(item => item.value == formValues.status)[0].title
                            },
                            comment: formValues.comment,
                            notice: formValues.notice
                        }
                        tempHistoryList = [...tempHistoryList, historyToAdd];
                        tempOrder.orderHistoryList = tempHistoryList;
                        setOrder(tempOrder);
                        prepareOrderHistoryData(tempOrder);
                        form.resetFields();

                    } else {
                        setSpinActiveOrderHistory(false);
                        message.error(result.message);
                        form.resetFields();
                    }
                },
                (error) => {
                    setSpinActiveOrderHistory(false);
                    message.error(error);
                    console.log(error);
                }
            );

    };

    return (
        <Row justify="center">
            <Col xs={24} md={24}>

                {order && (
                    <Card title={order.orderNumber + ' nolu Sipariş Detayı'}>
                            <div className="gx-module-box-content">
                                <div className="gx-module-box-column">

                                    <Row>
                                        <Col xs={24} md={12}>
                                            <Card style={{paddingLeft:"10px"}} title=" Teslimat Bilgileri" >
                                                <p>{order.customer}</p>
                                                <p>{order.addressDTO.addressDescription}</p>
                                                <p>{order.addressDTO.county}{order.addressDTO.province}</p>
                                                <p>{order.addressDTO.telephone}</p>
                                            </Card>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Card style={{paddingLeft:"10px"}} title=" Sipariş Bilgileri">
                                                <p><b>Sipariş Tarihi : </b>{order.createdDate}</p>
                                                <p><b>Okul : </b>{order.schoolName}</p>
                                                <p><b>Sınıf : </b>{order.gradeName}</p>
                                                <p><b>Öğrenci Adı : </b>{order.studentName}</p>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Card title="Ürünler">
                                        <Table dataSource={data} columns={columns}>
                                        </Table>
                                    </Card>
                                   
                                    <Card title="Sipariş Geçmişi">
                                        <Table pagination={false} dataSource={orderHistoryData} columns={orderHistoryColumns}>
                                        </Table>
                                        <Spin indicator={antIcon} spinning={spinActiveOrderHistory} >
                                        <Card title="Durum Ekle">
                                            <Form form={form} onFinish={handleSubmit} name="orderHistoryForm" {...formItemLayout}>
                                                <FormItem label="Sipariş Durumu" name="status">
                                                    <Select>
                                                        <Option value="0">Sipariş Teslim Edildi</Option>
                                                        <Option value="1">Ödeme Tamamlandı</Option>
                                                        <Option value="2">Geri Ödendi</Option>
                                                        <Option value="3">İptal edildi</Option>
                                                        <Option value="4">Paket Hazırlanıyor</Option>
                                                        <Option value="5">Geçersiz</Option>
                                                        <Option value="6">Ödeme Bekleniyor</Option>
                                                        <Option value="7">Kargoya Teslim Edildi</Option>
                                                        <Option value="8">Paket Hazır/Mağazada Bekliyor</Option>
                                                        <Option value="9">Ödeme Alınamadı</Option>

                                                    </Select>
                                                </FormItem>
                                                <FormItem label="Müşteriye Bildir" name="notice" valuePropName="checked">
                                                    <Checkbox />
                                                </FormItem>
                                                <FormItem label="Açıklama" name="comment">
                                                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} margin="normal" />
                                                </FormItem>

                                                <Button style={{ float: "right" }} type="primary" htmlType="submit">
                                                    Kaydet
            </Button>

                                            </Form></Card></Spin>
                                    </Card>
                                </div>
                            </div>
                      
                    </Card>
                )}


            </Col>



        </Row>
    );
};
export default OrderDetail;

