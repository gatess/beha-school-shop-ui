import React from 'react';
import { Table,  Popconfirm,  InputNumber } from 'antd';

const ProductTable = (props) => {

    debugger;
        const columns = [
            {
                title: 'Ürün Resmi',
                dataIndex: 'productImage',
                width: '30%',
                editable: true,
                render: (text, record) => {
                  return (<img style={{maxWidth:"60px"}} alt="example" 
                  src={record.productImage}/>);
        
                }
                
              },
              {
            title: 'Ürün Adı',
            dataIndex: 'productName',
            width: '30%',
            editable: true,
          },
          {
            title: 'Adet',
            dataIndex: 'quantity',
            render: (text, record) => {
              return (<InputNumber min={1} max={100} defaultValue={record.quantity} onChange={(e) => onQuantityChange(record.key, e)} />);
    
            }
          },
          {
            title: 'Fiyat',
            dataIndex: 'price',
          },
          {
            title: '',
            dataIndex: 'operation',
            render: (text, record) =>
              <Popconfirm title="Silmek istediğinize emin misiniz?" okText="Evet"
              cancelText="Hayır" onConfirm={() => handleDelete(record.key)}>
                <a>Sil</a>
              </Popconfirm>
          },
        ];
    
        const onQuantityChange = (key, quantity) => {
          props.quantityChange(key, quantity);
        }

      let data = props.product.map((product, shopIndex) => {
      return ({ productName: product.product.name,  productImage: product.product.productImages[0].filePath,
        quantity: product.quantity, price: product.price, key: product.product.barcode })
     });
    
    
        const handleDelete = key => {
          let ds = [...data];
          debugger;
          data = ds.filter(item => item.key !== key);
          props.deleteProduct(key);
        };
    

      return (
          <div>
        <Table
        
          className="components-table-demo-nested"
          columns={columns}
          dataSource={data}
        /></div>
      );
      }

export default ProductTable;