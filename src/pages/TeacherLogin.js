import React , {useState , useEffect} from "react";
import {Button, Checkbox, Form, Input , message , Spin} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined , LockOutlined , LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

const FormItem = Form.Item;

const TeacherLogin = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const history = useHistory();
  const [spinActive , setSpinActive] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('teacherId'))
    {
        history.push({
            pathname: '/teacher/teacheraddproduct'      
          });
    }
  },[]);

  const handleSubmit = (value) => {
    debugger; 
    setSpinActive(true); 
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/teacher/login/",{
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
            localStorage.setItem('teacherId',JSON.stringify(result.lesson[0].teacher.id));
            localStorage.setItem('lessons',JSON.stringify(result.lesson));
            //let lessons = result.map((lesson, index) =>);
            //props.UpdateUser(123);
           // localStorage.setItem('userId', result.userInformationDTO.userId);
           history.push({
            pathname: '/teacher/teacheraddproduct'
          })
          }else{
            message.error(result.message);
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
          <h1 className="gx-login-title">????retmen Giri??i</h1>
        </div>
        <Spin indicator={antIcon} spinning={spinActive} >
        <Form onFinish={handleSubmit} className="gx-login-form gx-form-row0">
          <FormItem name="email" rules={[{required: true, message: 'L??tfen Email Giriniz!'}]}>            
              <Input prefix={ <UserOutlined  style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="E-posta"/>            
          </FormItem>
          <FormItem name="password"  rules={[{required: true, message: 'L??tfen ??ifrenizi Giriniz!'}]}>  
              <Input prefix={<LockOutlined  style={{color: 'rgba(0,0,0,.25)'}}/>}
                     type="password"
                     placeholder="??ifre"/>
          </FormItem>
          <FormItem>
            
            
              <Checkbox name="remember">Beni Hat??rla</Checkbox>
            
            <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">??ifremi Unuttum</Link>
          </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit">
              Giri??
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

export default connect(mapStateToProps,mapDispatchToProps) (TeacherLogin);
