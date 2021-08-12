import React from 'react';
import { Table,  Popconfirm,  InputNumber } from 'antd';

const TeacherTable = (props) => {
        
    
        const columns = [
              {
            title: 'Öğretmen Adı',
            dataIndex: 'name',
            width: '30%',
            editable: true,
          },
          {
            title: 'E-posta',
            dataIndex: 'email'
          },
          {
            title: 'Şifre',
            dataIndex: 'password'
          },
          {
            title: 'Sil',
            dataIndex: 'operation',
            render: (text, record) =>
              <Popconfirm title="Silmek istediğinize emin misiniz?" okText="Evet"
              cancelText="Hayır"  onConfirm={() => handleDelete(record.key)}>
                <a>Sil</a>
              </Popconfirm>
          }
        ];
    debugger;
      let data = props.teacher.map((teacher, shopIndex) => {
      return ({ name: teacher.name, email:teacher.email, password:teacher.password , key:teacher.id })});
    
        const handleDelete = key => {
          let ds = [...data];
          debugger;
          data = ds.filter(item => item.key !== key);
          props.deleteTeacher(key);
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

export default TeacherTable;