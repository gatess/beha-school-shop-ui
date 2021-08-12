import React , {useState, useEffect} from "react";
import { Button, Checkbox, Form, Input, message , Spin } from "antd";
import {UserOutlined , LockOutlined , LoadingOutlined , MailOutlined , GoogleOutlined , FacebookOutlined } from '@ant-design/icons';
import { Link , useHistory} from "react-router-dom";
const FormItem = Form.Item;

const SignUp = (props) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [spinActive , setSpinActive] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        if(localStorage.getItem('userId'))
        {
            history.push({
                pathname: '/app'      
              });
        }
    },[]);

    const handleSubmit = (value) => {
        debugger;
        console.log(value);
        let request = {
            name: value.name,
            surName: value.surName,
            email: value.email,
            password: value.password
          };
        
    //props.UpdateUser(12);
    if (value.password !== value.confirmPassword) {
        message.error("Şifreler eşleşmiyor.Lütfen tekrar deneyiniz. ");
    } else {
    setSpinActive(true); 
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/user/add/",{
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
            localStorage.setItem('userId', result.userInformationDTO.userId);
            history.push({
                pathname: '/app'      
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
    }  
    };


    

    return (
        <div className="gx-login-container">
            <div className="gx-login-content">
                <div className="gx-login-header gx-text-center">
                    <h1 className="gx-login-title">Kayıt Ol</h1>
                </div>
                <Spin indicator={antIcon} spinning={spinActive} >
                <Form onFinish={handleSubmit} className="gx-login-form gx-form-row0">
                    <FormItem name="name" rules={[{ required: true, message: 'Lütfen Adınızı Giriniz!' }]}>

                        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="İsim" />

                    </FormItem>
                    <FormItem name="surName" rules={[{ required: true, message: 'Lütfen Soyadınızı Giriniz!' }]}>

                        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Soyisim" />

                    </FormItem>
                    <FormItem name="email" rules={[{ required: true, message: 'Lütfen emaili giriniz!' }]}>

                        <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email" />

                    </FormItem>
                    <FormItem name="password" rules={[{ required: true, message: 'Lütfen Şifrenizi Giriniz!' }]}>

                        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                            placeholder="Şifre" />

                    </FormItem>
                    <FormItem name="confirmPassword" rules={[{ required: true, message: 'Lütfen Şifrenizi Giriniz!' }]}>

                        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                            placeholder="Şifre Tekrar" />

                    </FormItem>
                    <FormItem name="remember">

                        <Checkbox>Beni Hatırla</Checkbox>

                        <Link className="gx-login-form-forgot" to="/forgotpassword">Şifremi Unuttum</Link>
                    </FormItem>
                    <FormItem className="gx-text-center">
                        <Button type="primary" htmlType="submit">
                            Kayıt Ol
            </Button>
                    </FormItem>
                </Form>
                </Spin>
                <div className="gx-flex-row">
                    <span className="gx-mb-2 gx-mr-3"> </span>
                    <ul className="gx-social-link">
                        <li>
                            <GoogleOutlined />
                        </li>
                        <li>
                            <FacebookOutlined />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
