
import React, { useState, useEffect } from 'react';
import { Input, Spin, message, Form,Button } from 'antd';
import { useHistory } from "react-router-dom";
import {UserOutlined  , LoadingOutlined , MailOutlined  } from '@ant-design/icons';
const FormItem = Form.Item;
const UserInformation  = (props) => {

    const [userId, setUserId] = useState(null);
    const history = useHistory();
    const [form] = Form.useForm();
    useEffect(() => {
        const userID = localStorage.getItem('userId');
        setUserId(userID);
        form.setFieldsValue(props.userData);
    },[props.userData]);
    
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [spinActive , setSpinActive] = useState(false);
    const handleSubmit = (value) => {
        
        debugger;
        const request = { userId: userId, ...value };
        console.log(request);
    setSpinActive(true); 
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/customer/update-customer/",{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
  } )
      .then(res => res.json())
      .then(
        (result) => {
          setSpinActive(false);
          debugger;
          console.log(result);
          if(result.status === 's'){
            message.success('Bilgiler başarıyla güncellendi.')
            history.push({
                pathname: '/app/myaccount'      
              });
          }else{
            message.error(result.message);
          }
        },
        (error) => {
          setSpinActive(false);
          console.log(error);
        }
      ); 
     
    };
    return (
    
        <div className="gx-login-content"><Spin indicator={antIcon} spinning={spinActive} >
    <Form form={form} onFinish={handleSubmit} className="gx-login-form gx-form-row0">
        <FormItem name="name" rules={[{ required: true, message: 'Lütfen Adınızı Giriniz!' }]}>

            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="İsim" />

        </FormItem>
        <FormItem name="surname" rules={[{ required: true, message: 'Lütfen Soyadınızı Giriniz!' }]}>

            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Soyisim" />

        </FormItem>
        <FormItem name="email" rules={[{ required: true, message: 'Lütfen emaili giriniz!' }]}>

            <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="E-posta" />

        </FormItem>
      
        <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit">
                Kaydet
</Button>
        </FormItem>
    </Form>
    </Spin> </div>
    );
}

export default UserInformation;