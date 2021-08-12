import React, { useRef } from 'react';
import { Table,  Popconfirm, InputNumber } from 'antd';




const NestedTableTeacher = (props) => {
  const expandedRowRender = (row) => {
    console.log(row);

    const columns = [
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
          <Popconfirm title="o delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Sil</a>
          </Popconfirm>
      },
    ];

    const onQuantityChange = (key, quantity) => {
      //debugger;
      props.quantityChange(key, quantity)
      //console.log('number input');
    }




    let data = row.shopLists.map((shopList, shopIndex) => {
      return ({ productName: shopList.productDto.name, quantity: shopList.quantity, price: shopList.price, key: shopList.id })
    });

    const handleDelete = key => {
      let ds = [...data];
      data = ds.filter(item => item.key !== key);
      props.deleteProduct(key);
    };

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Ders Adı', dataIndex: 'lessonName', key: 'lessonName' }

  ];



  const data = props.shopListResult.map((lesson, index) => {
    return ({ lessonName: lesson.name, key: index , shopLists: lesson.shopLists });
  });

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
    />
  );
}
export default NestedTableTeacher;