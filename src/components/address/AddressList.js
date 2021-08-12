import React, { useState  } from "react";
import { Radio } from 'antd';
import CustomScrollbars from '../../util/CustomScrollbars';

import AddressListItem from "./AddressListItem";

const AddressList = (props) => {

  const [addressId,setAdressId] = useState(null);
  const addressListItems = props.addressData.map((address,index) =>
  <AddressListItem key={index} address={address} onMyAddress={props.onMyAddress}  
   onEditClick ={props.onEditClick}  onDeleteClick = {props.onDeleteClick}/>);
   const onChange = (e)  => {
     debugger;
    console.log('radio checked'+addressId);
    setAdressId(e.target.value);
    props.onSelectAddress(e.target.value);
  };

  return (
    <div className="gx-module-list gx-mail-list">
    <Radio.Group  onChange={onChange} value={addressId} > 
  <CustomScrollbars className="gx-module-content-scroll">      
     {addressListItems}
     
  </CustomScrollbars></Radio.Group>
    </div>
  )
};

export default AddressList;