import React, { useState,useEffect } from 'react';
import {LoadingOutlined } from '@ant-design/icons';
import {Spin , Card} from 'antd';
import AddressList from '../address/AddressList';
import AddressModal from '../address/AddressModal';

const AddressInformation  = (props) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    //const history = useHistory();
    const [spinActive , setSpinActive] = useState(false);
    const [selectedDeleteAddress, setselectedDeleteAddress] = useState(null);
    const [addressListData, setAddressListData] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [userId, setUserId] = useState(null);
    const [myAddress, setMyAddress] = useState(null);
    const [selectedEditAddress, setselectedEditAddress] = useState(null);
    const [adressModalStatus, setAddressModalStatus] = useState(false);

    useEffect(() => {
        //formRef.current.setFieldsValue(props.userData);
        const userID = localStorage.getItem('userId');
        setUserId(userID);
        setMyAddress('1');
    });

    const handleSelectAddress = (addressId) => {
        setSelectAddress(addressId);
    }
    const deleteAddress = (addressId) => {
        setSpinActive(true);
        fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/customer/deleteAddress/" + addressId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.message);
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
    
    const addAddress = (addedAddress) => {
        setAddressListData([addedAddress, ...addressListData]);
    }
    const handleCancel = () => {
        setselectedEditAddress(null);
        setAddressModalStatus(false);
    }
    const editAddress = (addressId) => {
        addressListData.forEach(address => {
            if (address.id === addressId) {
                setselectedEditAddress(address);
                setAddressModalStatus(true);
            }
        })
    }

    const updateAddress = () => {
        debugger;
        setselectedEditAddress(null);
        setAddressModalStatus(false);
        props.updateData();
        

    }

    useEffect(() => {
        debugger;
        setAddressListData(props.addressData);
         },[props.addressData]);

    return (
<Card style={{padding:"0 24px"}}
    title="Adreslerim" extra={<a onClick={() => setAddressModalStatus(true)} > Adres Ekle</a>}>
        <Spin indicator={antIcon} spinning={spinActive} >
    <div className="gx-module-box-content" >
        <div className="gx-module-box-column">
         
        <AddressList onMyAddress={myAddress}   onSelectAddress={handleSelectAddress} onDeleteClick={deleteAddress} addressData={addressListData} onEditClick={editAddress}></AddressList>
                        </div>
                        <AddressModal updateAddress={updateAddress} userId={userId} deleteAddress={selectedDeleteAddress} editAddress={selectedEditAddress}
                         addAddress={addAddress} open={adressModalStatus} onCancel={handleCancel} />
    </div>
    </Spin></Card>
    );
}

export default AddressInformation;