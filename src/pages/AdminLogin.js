import React , {useState , useEffect} from "react";
import {Button, Checkbox, Form, Input , message , Spin} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined , LockOutlined , LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

const FormItem = Form.Item;

const AdminLogin = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const history = useHistory();
  const [spinActive , setSpinActive] = useState(false);
  
  useEffect(() => {
    let adminResult = JSON.parse(localStorage.getItem('adminResult')); 
    if(adminResult) {
        history.push({
          pathname: '/admin/dashboard'
        })
    }
  }, []);

  const handleSubmit = (value) => {
    debugger; 
    setSpinActive(true); 
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/admin/login/",{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
  } )
      .then(res => res.json())
      .then(
        (result) => {
          setSpinActive(false);
          debugger;
          console.log(result);
          if(result.status === 's'){
            localStorage.setItem('adminResult',JSON.stringify(result));
           history.push({
            pathname: '/admin/dashboard'
          })
          }else{
            message.error(result.errorMessage);
          }
        },
        (error) => {
          setSpinActive(false);
          console.log(error);
        }
      ); 
    /*e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log("values", values)
    }); */
  };



  return (
    <div className="gx-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Admin Girişi</h1>
        </div>
        <Spin indicator={antIcon} spinning={spinActive} >
        <Form onFinish={handleSubmit} className="gx-login-form gx-form-row0">
          <FormItem name="email" rules={[{required: true, message: 'Lütfen Email Giriniz!'}]}>            
              <Input prefix={ <UserOutlined  style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="E-posta"/>            
          </FormItem>
          <FormItem name="password"  rules={[{required: true, message: 'Lütfen Şifrenizi Giriniz!'}]}>  
              <Input prefix={<LockOutlined  style={{color: 'rgba(0,0,0,.25)'}}/>}
                     type="password"
                     placeholder="Şifre"/>
          </FormItem>
          <FormItem>
            
            
              <Checkbox name="remember">Beni Hatırla</Checkbox>
            
            <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Şifremi Unuttum</Link>
          </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit">
              Giriş
            </Button>
            
          </FormItem>
        </Form>
        </Spin>
      </div>
    </div>
  );
};

const mapStateToProps = (state)=>{
  return {
    posts:state.posts
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    UpdateUser:(userId)=>{dispatch({type:'UPDATE_USER',userId})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (AdminLogin);
