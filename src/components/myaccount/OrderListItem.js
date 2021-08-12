import React, { useState, useEffect } from 'react';
import { Collapse ,Steps , Table , Row, Col, Card} from 'antd';
import { CarOutlined ,LikeOutlined , SmileOutlined , ShoppingOutlined  } from '@ant-design/icons';
const { Step } = Steps;
const OrderListItem  = (props) => {
    const order = props.order;
    const [orderStatus,setOrderStatus] = useState('yok');
    const [withoutStep,setWithoutStep] = useState(null);
    const [statusPaymentComplete,setStatusPaymentComplete] = useState('wait');
    const [statusPrepare,setStatusPrepare] = useState('wait');
    const [statusCargo,setStatusCargo] = useState('wait');
    const [statusOrderFinish,setStatusOrderFinish] = useState('wait');
    const [step,setStep] = useState();
    useEffect(() => {
        orderStatusChange();
        
      },[]);
      let steps = <Steps>
      <Step status={statusPaymentComplete} title="Siparişiniz Alındı" icon={<LikeOutlined />}/>
      <Step status={statusPrepare} title="Paket Hazırlanıyor" icon={<ShoppingOutlined />} />
      <Step status={statusCargo} title="Dağıtıma Çıkarıldı" icon={<CarOutlined />} />
      <Step status={statusOrderFinish} title="Teslim Edildi" icon={<SmileOutlined />} />
        </Steps>;
      const orderStatusChange = () => {
        if(order.orderStatus==='STATUS_PAYMENT_ERROR'){
            setOrderStatus(order.orderStatusDescription); 
            setWithoutStep(<div style={{fontWeight:"bold"}}><p>Ödeme Alınamadı</p></div>);
        }
        else if(order.orderStatus==='STATUS_AWATING_PAYMENT'){
          setOrderStatus(order.orderStatusDescription); 
          setWithoutStep(<div style={{fontWeight:"bold"}}><p>Ödeme Bekleniyor</p></div>);
        }
        else if(order.orderStatus==='STATUS_CANCEL'){
          setOrderStatus(order.orderStatusDescription); 
          setWithoutStep(<div style={{fontWeight:"bold"}}><p>İptal edildi</p></div>);
        }
        else if(order.orderStatus==='STATUS_REFUND'){
          setOrderStatus(order.orderStatusDescription); 
          setWithoutStep(<div style={{fontWeight:"bold"}}><p>Geri Ödendi</p></div>);
        }
        else if(order.orderStatus==='STATUS_INVALID'){
          setOrderStatus(order.orderStatusDescription); 
          setWithoutStep(<div style={{fontWeight:"bold"}}><p>Geçersiz sipariş</p></div>);
        }
        else if(order.orderStatus==='PACKAGE_READY'){
            setOrderStatus(order.orderStatusDescription);
            setStatusPaymentComplete('finish');    
        }
        else if(order.orderStatus==='STATUS_PAYMENT_COMPLETE'){
            setOrderStatus(order.orderStatusDescription); 
            setStatusPaymentComplete('finish');      
        }
        else if(order.orderStatus==='STATUS_PREPARE'){
            setOrderStatus(order.orderStatusDescription);
            setStatusPaymentComplete('finish');
            setStatusPrepare('finish');        
        }
        else if(order.orderStatus==='STATUS_DELIVERED_TO_CARGO'){
            setOrderStatus(order.orderStatusDescription);
            setStatusPaymentComplete('finish');
            setStatusPrepare('finish'); 
            setStatusCargo('finish'); 
        }
        else {
            setOrderStatus('Teslim Edildi');
            setStatusPaymentComplete('finish');
            setStatusPrepare('finish'); 
            setStatusCargo('finish');
            setStatusOrderFinish('finish');
            setStep();  
        }
      }

    let data = props.order.orderDetailList.map((orderDetail, shopIndex) => {
        return ({ name: orderDetail.product.name, 
            quantity: orderDetail.quantity, price: orderDetail.price, key: orderDetail.product.barcode })
      });
    const { Panel } = Collapse;

    
    const genExtra = () => (
        <p>{orderStatus}</p>
       
      );
      const  callback = key => {
        console.log(key);
      }
      const columns = [
        { title: 'Ürün Adı', dataIndex: 'name', key: 'name' },
        { title: 'Fiyat', dataIndex: 'price', key: 'price' },
        { title: 'Adet', dataIndex: 'quantity', key: 'quantity' }

    
      ];

    return(
        <Collapse style={{marginTop:10}}
          defaultActiveKey={['1']}
          onChange={callback}>
          <Panel  header={"Sipariş Numarası : "+order.orderNumber} key="1" extra={genExtra()}>
          <Row style={{margin:20}}>{withoutStep!=null ?  withoutStep : steps}</Row>
  <Row>
      <Col xs={24} md={12}>
        <Card title="Teslimat Bilgileri" >
          <p>{order.addressDTO.addressName}</p>
          <p>{order.addressDTO.addressDescription}</p>
          <p>{order.addressDTO.county}{order.addressDTO.province}</p>
          <p>{order.addressDTO.telephone}</p>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Sipariş Bilgileri">
        <p>{order.schoolName}</p>
        <p>{order.createdDate}</p>
        <p>Öğrenci Adı : {order.studentName}</p>
        <p>Toplam Tutar : {order.total} TL</p>
         
        </Card>
      </Col>
    </Row>
    
  <Card title="Ürünler" style={{ marginTop: 30 }}>
  <Table dataSource={data}
  
  columns={columns}
  >

  </Table>
        </Card>
          </Panel>
          
        </Collapse>

    );

}

export default OrderListItem;