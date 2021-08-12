import React, { useState, useEffect } from 'react';
import {  useHistory } from "react-router-dom";
import { Card, Row, Col, Spin, Button , message} from 'antd';
import AddressList from '../components/address/AddressList';
import AddressModal from '../components/address/AddressModal';
import { LoadingOutlined } from '@ant-design/icons';

const Address = (props) => {
    const history = useHistory();
    const [addressChoose,setaddressChoose]=useState('1');
    const [adressModalStatus, setAddressModalStatus] = useState(false);
    const [addressListData, setAddressListData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [updateAddressValue, setUpdateAddressValue] = useState(null);
    const [selectedEditAddress, setselectedEditAddress] = useState(null);
    const [selectAddress, setSelectAddress] = useState(null);
    const [selectedDeleteAddress, setselectedDeleteAddress] = useState(null);
    const [spinActive, setSpinActive] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        debugger;
        const userID = localStorage.getItem('userId');
        console.log(userID);
        if (!(userID && userID.length > 0)) {
            history.push({
                pathname: '/app/signin'
            });
        } else {
            setUpdateAddressValue(null);
            setUserId(userID);
            fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/customer/getAddresses/" + userID)
                .then(res => res.json())
                .then(
                    (result) => {
                        setAddressListData(result);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }, [updateAddressValue]);

    const handleCancel = () => {
        setselectedEditAddress(null);
        setAddressModalStatus(false);
    }

    const updateAddress = () => {
        debugger;
        setUpdateAddressValue('1');
        setselectedEditAddress(null);
        setAddressModalStatus(false);
        

    }

    const addAddress = (addedAddress) => {
        debugger;
        setAddressListData([addedAddress, ...addressListData]);
    }

    const editAddress = (addressId) => {
        addressListData.forEach(address => {
            if (address.id === addressId) {
                setselectedEditAddress(address);
                setAddressModalStatus(true);
            }
        })
    }
    const navigateAddress = () => {
        if(!selectAddress){
            message.warn('Lütfen Adres Seçiniz', 3);
        }else{
            history.push({
                pathname: '/app/paymentinformation',
                state: { addressId: selectAddress }
            })
        }
        
    };

    const handleSelectAddress = (addressId) => {
        debugger;
        setSelectAddress(addressId);
    }

    const addAddressButton = () => {
        debugger;
        setAddressModalStatus(true);      
    }

    const deleteAddress = (addressId) => {
        setSpinActive(true);
        fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/customer/deleteAddress/" + addressId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.message);
                    debugger;
                    let sc = [...addressListData];
                    setAddressListData(sc.filter(item => item.id !== addressId));
                    setSpinActive(false);
                },
                (error) => {
                    setSpinActive(false);
                    console.log(error);
                }
            );

    }
    return (
        <Row justify="center">
            <Col xs={24} md={12}>
                <Card title="Adres Seçimi" extra={<a onClick={addAddressButton} > Adres Ekle</a>}>
                <Spin indicator={antIcon} spinning={spinActive} >
                    <div className="gx-module-box-content">
                        <div className="gx-module-box-column">
                            <AddressList onSelectAddress={handleSelectAddress} onDeleteClick={deleteAddress} addressData={addressListData} onEditClick={editAddress}></AddressList>
                        </div>
                        <AddressModal userId={userId} deleteAddress={selectedDeleteAddress} editAddress={selectedEditAddress}
                          addressChoose={addressChoose}  addAddress={addAddress} open={adressModalStatus} onCancel={handleCancel} updateAddress={updateAddress} />
                    </div>
                    </Spin>
                </Card>
                <Row justify="center" /*style={{ marginTop: 10 }}*/>
                    <Col xs={24} md={12} className="gx-text-center" >
                        <Button type="primary" onClick={navigateAddress}>Siparişi Onayla</Button></Col>
                </Row>
            </Col>



        </Row>
    );
};
export default Address;

