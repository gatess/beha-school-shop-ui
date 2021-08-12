import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, InputNumber } from 'antd';

const EditableContext = React.createContext();


const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        {{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};


const EditableTable = (props) => {

  const [dataSource, setDataSource] = useState();

  const [count, setCount] = useState(2);

  useEffect(() => {
    setDataSource(props.dataSource);
  }, [props.dataSource]);

  const onQuantityChange = (key , quantity) => {
    debugger;
    props.quantityChange(key , quantity)
    console.log('number input');
  }

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
        return (<InputNumber min={1} max={100} defaultValue={record.quantity} onChange={(e)=>onQuantityChange(record.key , e)} />);

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
        dataSource.length >= 1 ? (
          <Popconfirm title="Silmek istediğinize emin misiniz?" okText="Evet"
          cancelText="Hayır" onConfirm={() => handleDelete(record.key)}>
            <a>Sil</a>
          </Popconfirm>
        ) : null,
    },
  ];


  const handleDelete = key => {
    let ds = [...dataSource];
    setDataSource(ds.filter(item => item.key !== key));
    props.deleteProduct(key);
  };



  const handleSave = row => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });

    setDataSource(newData);

  };


  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const cols = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={cols}
        title={() => props.title}
      />
    </div>
  );


}
export default EditableTable;

