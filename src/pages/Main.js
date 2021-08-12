import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Select, Card, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
//import '../App.css';
import NestedTable from '../NestedTable';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

//const backendUrl = "http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/student/getSchools";
const { Option } = Select;
/*const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}; */

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

/*const tailFormItemLayout = {
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

const Main = (props) => {

  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  console.log(props.posts);
  const formRef = useRef();
  const [schoolOptions, setSchoolOptions] = useState();
  const [gradeOptions, setGradeOptions] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [shopListDataSource, setShopListDataSource] = useState([]);
 // const [productTables, setProductTables] = useState();
  const [shoppingCart, setShopCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [spinActive, setSpinActive] = useState(false);

  useEffect(() => {
    setSpinActive(true);
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/student/getSchools")
      .then(res => res.json())
      .then(
        (result) => {
          setSpinActive(false);
          let schools = result.map((school, index) => 
          <Option key={index} value={school.id}>{school.name}</Option>);
          setSchoolOptions(schools);
        },
        (error) => {
          setSpinActive(false);
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    handleShopCartChange();
  }, [shoppingCart]);

  const handleShopCartChange = () => {
    debugger;
    console.log(shoppingCart);
    let priceArray = shoppingCart.map((cart) => cart.quantity * cart.price);
    let totPrice = priceArray.reduce(function (a, b) { return a + b; }, 0);
    setTotalPrice(totPrice.toFixed(2));
    console.log(totPrice);
  }


  const onSchoolChange = schoolId => {
    setSpinActive(true);
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/student/grade/" + schoolId)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          let grades = result.map((grade, index) => <Option key={index} value={grade.id}>{grade.name}</Option>);
          setGradeOptions(grades);
          debugger;
          setSelectedGrade("1.sınıf");
          setSpinActive(false);
        },
        (error) => {
          console.log(error);
          setSpinActive(false);
        }
      );
  };

  const onQuantityChange = (key, quantity) => {
    debugger;
    let tempCart = shoppingCart;
    tempCart.forEach(cart => {
      if (cart.key === key) {
        cart.quantity = quantity;
      }
    })
    setShopCart(tempCart);
    console.log(shoppingCart);
    handleShopCartChange();
  }

  const onDeleteProduct = (key) => {
    debugger;
    let sc = [...shoppingCart];
    setShopCart(sc.filter(item => item.key !== key));
    let shopListDsTemp = [...shopListDataSource];
    shopListDsTemp.forEach(list => {
      list.shopLists = list.shopLists.filter(item => item.id !== key)
    })
    setShopListDataSource(shopListDsTemp);
    console.log(shopListDataSource);

  }

  const getShoppingCart = (shopList) => {
    debugger;
    let sc = [];
    shopList.forEach(lesson => {
      lesson.shopLists.forEach(shopList => {
        let exist = false;
        /*if (sc.length > 0) {
          sc.forEach(c => {
            if (c.key === shopList.productDto.barcode) {
              c.quantity = c.quantity + shopList.quantity
              exist = true;
            }
          }) 
        } */
        if (!exist) {
          sc = [...sc, { product: shopList.product, quantity: shopList.quantity, price: shopList.price, key: shopList.id }];
        }
      });
    });
    return sc;
  }

  const onFinish = (value) => {      
    debugger; 
    setSelectedGrade(formRef.current.getFieldsValue().grade);
    setSpinActive(true);
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/student/shoplist/" + formRef.current.getFieldsValue().grade)
      .then(res => res.json())
      .then(
        (result) => {
          setSpinActive(false);     
          let firstProduct=result[0];    
          setShopListDataSource(result);     
          debugger;  
          //let grades = result.map((grade, index) => <Option key={index} value={grade.id}>{grade.name}</Option>);
          //setGradeOptions(grades);
          let sc = getShoppingCart(result);
          setShopCart(sc);

          //console.log({ shoppingCart });
          //let products = result.map((lesson, index) => {
          // let dataSource = lesson.shopLists.map((shopList, shopIndex) => {
          //   return ({ productName: shopList.productDto.name, quantity: shopList.quantity, price: shopList.price, key: shopList.productDto.barcode })
          // }
          //);
          // return (<EditableTable key={index} title={lesson.name} quantityChange={onQuantityChange} deleteProduct={onDeleteProduct} dataSource={dataSource} />);
          //});
          // debugger;
          //setProductTables(products);
        },
        (error) => {
          setSpinActive(false);
          console.log(error);
        }
      );
  };

  const onReset = () => {
    formRef.current.resetFields();
  };



  /*const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Adet',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price ',
    }
  ];*/

  const navigateCustInfo = () => {
    debugger;
    localStorage.setItem('shopCart', JSON.stringify(shoppingCart));
    localStorage.setItem('grade', selectedGrade);
    localStorage.setItem('totalPrice', totalPrice);
    history.push({
      pathname: '/app/address'
    })
  }




  return (

    <React.Fragment>
      <Row align="start" justify="center">
        <Col xs={24} md={12}>
          <Card>
            <Spin indicator={antIcon} spinning={spinActive} >
              <Form {...formItemLayout} ref={formRef} name="control-ref" onFinish={onFinish} >
                <Form.Item
                  name="school"
                  label="Okullar"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Lütfen Okul seciniz"
                    onChange={onSchoolChange}
                    allowClear
                  >
                    {schoolOptions}
                  </Select>
                </Form.Item>
                 <Form.Item
                  name="grade"
                  label="Sınıflar"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                   
                  <Select
                    placeholder="Lütfen Sınıf seciniz"
                    allowClear
                    value={selectedGrade}
                  >
                    {gradeOptions}
                  </Select>
                </Form.Item>

                <Form.Item className="gx-text-center" >

                  <Button type="primary" htmlType="submit">
                    Ürünleri Göster
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Temizle
                  </Button>

                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </Col>
      </Row>
      <Row align="center" justify="center" /*style={{ marginTop: 30 }}*/>
        <Col xs={24} md={12}>
          <Card title="Ürünler">
            <NestedTable shopListResult={shopListDataSource} quantityChange={onQuantityChange} deleteProduct={onDeleteProduct} />
            <p>Toplam Fiyat : {totalPrice}</p>
          </Card>

        </Col>
      </Row>
      <Row justify="center" /*style={{ marginTop: 10 }}*/>
        <Col xs={24} md={12} className="gx-text-center" >
          <Button type="primary" onClick={navigateCustInfo}>Siparişi Onayla</Button>
        </Col>
      </Row>
    </React.Fragment>

  );
};

const mapStateToProps = (state)=>{
  return {
    posts:state.posts
  }
}

export default connect(mapStateToProps) (Main);