import React from 'react';
import {Card ,  Row, Col} from 'antd';
import NestedTable from '../NestedTable';

/*const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};*/
const CustInfo = (props) => {


  return (
    
    <Row align="center" justify="center">
      <Col xs={24}  md={12}>
        <Card title="Ürün Ekleme">
        <NestedTable  />
           
          
        </Card>
      </Col>
    </Row>
    
  );
};
export default CustInfo;