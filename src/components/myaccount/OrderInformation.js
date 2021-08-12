import React, { useState, useEffect } from 'react';

const OrderInformation  = (props) => {
   
    const [userId, setUserId] = useState(null);
    const [oderListData, setOrderListData] = useState();

    
  useEffect(() => {
    const userID = localStorage.getItem('userId');
        setUserId(userID);
        fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/customer/getOrders/" + userID)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setOrderListData(result);
                   
                    //setStatusOptions(status);
                    //setCollapse(status);
                },
                (error) => {
                    console.log(error);
                }
            );
    
}, []);
  


    return(
        <div>
           
      </div>
    );
}

export default OrderInformation;