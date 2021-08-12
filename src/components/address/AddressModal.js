import React, {  useState, useEffect } from "react";
import { Input, message, Modal, Form } from "antd";
const { TextArea } = Input;
const FormItem = Form.Item;

const AddressModal = (props) => {
    //Form css
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };
  
    /*  const buttonItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      };*/

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        if (props.editAddress!=null) {
            form.setFieldsValue(props.editAddress);
        }
    });

    const onCancel = () => {
        props.onCancel();
        debugger;
        form.resetFields();

    }
    const handleOk = () => {
        debugger;
        console.log(form.getFieldsValue());
        if (props.userId) {
            if(props.editAddress!=null){
                setConfirmLoading(true);
                const request = { id: props.editAddress.id , userId: props.userId, ...form.getFieldsValue() };
            console.log(request);
            debugger;
            fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/customer/update-address/", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.status === 's') {
                            debugger;
                            props.updateAddress();
                            setConfirmLoading(false);
                            form.resetFields();
                            
                        } else {
                            message.error(result.message);
                            setConfirmLoading(false);
                            form.resetFields();
                        }
                    },
                    (error) => {
                        message.error(error);
                        console.log(error);
                    }
                );
            }
            else{
            const request = { userId: props.userId, ...form.getFieldsValue() };
            console.log(request);
            setConfirmLoading(true);
            fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/customer/add-address/", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.status === 's') {
                            //props.UpdateUser(123);
                            debugger;
                            const addedAddressValue = { id: result.id, ...form.getFieldsValue() };
                            props.addAddress(addedAddressValue);
                            props.onCancel();
                            setConfirmLoading(false);
                            form.resetFields();
                        } else {
                            message.error(result.message);
                            setConfirmLoading(false);
                            form.resetFields();
                        }
                    },
                    (error) => {
                        message.error(error);
                        console.log(error);
                    }
                );

        } }else {
            message.error("user bilgisi olmadan çalıştırılamaz");
        }


    }
    return (
        <div>
            <Modal
                title="Adres Düzenle"
                visible={props.open}
                onOk={handleOk}
                okText="Kaydet"
                cancelText="Çıkış"
                confirmLoading={confirmLoading}
                onCancel={onCancel} >
                <Form name="addressForm" form={form}  {...formItemLayout}>
                    <Form.Item  label="Adres Adı" name="addressName">
                             <Input margin="normal"/>
                    </Form.Item>
                    <FormItem label="Adres" name="addressDescription">
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} margin="normal" />
                    </FormItem>
                    <FormItem label="İl" name="province">
                             <Input margin="normal"/>
                    </FormItem>
                    <FormItem label="İlçe" name="county">
                             <Input margin="normal"/>
                    </FormItem>
                    <FormItem label="Cep Telefonu" name="telephone">
                             <Input margin="normal"/>
                    </FormItem>
                    <FormItem label="Posta Kodu" name="zipCode">
                            <Input margin="normal"/>
                    </FormItem>

                </Form>
            </Modal>
        </div>
    );
};
export default AddressModal;