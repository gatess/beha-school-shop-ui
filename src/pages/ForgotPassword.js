import React from "react";
import {Button, Form, Input} from "antd";
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;


const ForgotPassword = (props) => {
    const [form] = Form.useForm();
  const handleSubmit = (value) => {
   
  };


  return (
    <div className="gx-login-container">
      <div className="gx-login-content">

        <div className="gx-login-header">
          <img src={require("assets/images/logo-white.png")} alt="wieldy" title="wieldy"/>
        </div>
        <div className="gx-mb-4">
          <h2>Şifremi Unuttum</h2>
          <p><IntlMessages id="app.userAuth.forgot"/></p>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit} className="gx-login-form gx-form-row0">

          <FormItem name="email" rules={[{ required: true, message: 'Lütfen emaili giriniz!' },
        { type: 'email', message: 'E-posta adresi geçerli değil!'}]}>
            <Input type="email" placeholder="E-posta"/>
                      </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">
              <IntlMessages id="app.userAuth.send"/>
            </Button>
          </FormItem>
        </Form>

      </div>
    </div>
  );
}



export default ForgotPassword;