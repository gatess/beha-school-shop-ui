import React, { useState, useEffect } from "react";
import { Highlight } from 'react-instantsearch-dom';
import { Button, InputNumber, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ProductItem = ({ item }) => {
  console.log(item);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  //const history = useHistory();
  const [addButton, setAddButton] = useState('Ekle');
  const [addButtonType, setAddButtonType] = useState('primary');
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [productQuantity, setProductQuantity] = useState('1');
  const [spinActive, setSpinActive] = useState(false);
  const [inputNumberDisabled,setInputNumberDisabled]=useState(false);

  /*const icons = [];
  for (let i = 0; i < 5; i++) {
    const suffixClassName = i >= item.rating ? '--empty' : '';
    const suffixXlink = i >= item.rating ? 'Empty' : '';

    
  }*/

  useEffect(() => {
    setAddButton('Ekle');
    setAddButtonType('primary');
    setAddButtonDisabled(false);
    setInputNumberDisabled(false);
    setProductQuantity('1');
    debugger;
    let productLine = JSON.parse(localStorage.getItem('productLine'));
    productLine.shopLists.forEach(lesson => {

      if (item.barcode === lesson.product.barcode) {
        setAddButtonType('success');
        setAddButton('Eklendi');
        debugger;
        setAddButtonDisabled(true);
        setInputNumberDisabled(true);
        if(lesson.quantity!='1') {
          setProductQuantity(lesson.quantity);
        }
      }
      
    });

  });

  const sendBarcode = () => {
    setAddButton('Eklendi');
    setAddButtonType('success');
    setAddButtonDisabled(true);
    setInputNumberDisabled(true);
    
    let exist = false;
    let productLine = JSON.parse(localStorage.getItem('productLine'));
    productLine.shopLists.forEach(shopList => {
      if (shopList.product.barcode == item.barcode) {
        exist = true;
      }
    });
    if (!exist) {
      let shopListToAdd = {
        quantity: productQuantity,
        price: item.price,
        product: {
          name: item.name,
          barcode: item.barcode,
          productImages: [
            {
              filePath: item.image
            }
          ]
        }
      }
      const shopList = [...productLine.shopLists, shopListToAdd];
      productLine.shopLists = shopList;
      localStorage.setItem('productLine', JSON.stringify(productLine));
    }


  };
  const onChange = (value) => {
    console.log('changed', value);
    setProductQuantity(value);
  };
  return (
    <Spin indicator={antIcon} spinning={spinActive} >
      <div className="gx-product-item gx-product-vertical">
        <div className="gx-product-image" style={{ textAlign: "center" }}>
          <img style={{ width: "50%", height: "auto" }}
            src={`https://res.cloudinary.com/hilnmyskv/image/fetch/h_200,q_100,w_auto,c_scale/${
              item.image
              }`} alt=''
          />
        </div>
        <div className="gx-product-body">

          <div className="gx-product-name">
            <Highlight attribute="name" hit={item} />
          </div>
          <div className="gx-product-price">{item.price} TL</div>
          <InputNumber style={{ width: "50%", marginRight: "5%" }} min={1} max={50} disabled={inputNumberDisabled} value={productQuantity} onChange={onChange} />
          <Button type={addButtonType} htmlType="submit" onClick={sendBarcode} disabled={addButtonDisabled}>
            {addButton}
          </Button>

        </div>
      </div></Spin>
  );
};

export default ProductItem;
