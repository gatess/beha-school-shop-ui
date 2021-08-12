import React, {useEffect,useState} from 'react';
import {Col, Row} from 'antd';


import ProductItem from './ProductItem';

const ProductList = ({hits }) => {
  const [dataList, setDataList] = useState(hits);
 /* useEffect(() => {
    debugger;
    let productLine = JSON.parse(localStorage.getItem('productLine'));
    productLine.shopLists.forEach(lesson => {
      console.log(lesson.product.barcode);
      let data = hits.filter(item => item.barcode !== lesson.product.barcode);
      console.log(data);
      setDataList(data);
    }); });*/
  return (
    <div id="product">
      <Row>
        {
          hits.map(product => (
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <ProductItem item={product} key={product.objectID}/>
            
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
