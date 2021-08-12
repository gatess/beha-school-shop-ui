import React , { useEffect , useState } from "react";
import { Menu , Radio , Dropdown} from "antd";

const options = [
  'Düzenle'
];

const OrderListItem = (props) => {
  const order = props.order;

  debugger;
  const menus = () => (<Menu onClick={(e) => {
    if (e.key === 'Düzenle') {
      //this.onEditContact()
      props.onEditClick(order.id);
    } 
    
    else {
      //this.onDeleteContact(this.props.contact)
    }
  }
  }>
    {options.map(option =>
      <Menu.Item key={option}>
        {option}
      </Menu.Item>,
    )}
  </Menu>);

  return (
   
    <div className="gx-module-list-item gx-mail-cell">
      <div className="gx-mail-list-info" style={{maxWidth:"100%"}} onClick={() => {
        //onMailSelect(mail);
      }}>


        <div className="gx-module-list-content">
     
          <div className="gx-mail-user-des">

            <span className="gx-sender-name">{order.addressName}</span>

            <span className="gx-toolbar-separator">&nbsp;</span>

            <span className="gx-d-inline-block gx-text-truncate gx-send-subject">{order.studentName}</span>

     

            <div className="gx-time">{order.schoolName+'/'+order.schoolName}</div>

            <Dropdown overlay={menus()} placement="bottomRight" trigger={['click']}>
              <i className="gx-icon-btn icon icon-ellipse-v"/>
            </Dropdown>

          </div>


          <div className="gx-message">
            <p className="gx-text-truncate"> </p> 

          </div>
       
        </div>
     
      </div>
     
    </div>
  )
};

export default OrderListItem;
