import React , { useEffect , useState } from "react";
import { Menu , Radio , Dropdown} from "antd";

const options = [
  'Düzenle',
  'Sil',
];

const AddressListItem = (props) => {
  const [radio, setRadio] = useState();
  const address = props.address;
  useEffect(() => {
    console.log("bet");
    debugger;
    if(props.onMyAddress=='1'){
      setRadio(<Radio style={{display:"none"}} value={address.id} >   </Radio>);
    }
    else {
     setRadio(<Radio   value={address.id} >   </Radio>);
    }
  },[props.address]);

  const menus = () => (<Menu onClick={(e) => {
    if (e.key === 'Düzenle') {
      //this.onEditContact()
      props.onEditClick(address.id);
    } else if(e.key === 'Sil') {
      props.onDeleteClick(address.id);
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
      {radio}
      <div className="gx-mail-list-info" style={{maxWidth:"100%"}} onClick={() => {
        //onMailSelect(mail);
      }}>


        <div className="gx-module-list-content">
     
          <div className="gx-mail-user-des">

            <span className="gx-sender-name">{address.addressName}</span>

            <span className="gx-toolbar-separator">&nbsp;</span>

            <span className="gx-d-inline-block gx-text-truncate gx-send-subject">{address.addressDescription}</span>

     

            <div className="gx-time">{address.county+'/'+address.province}</div>

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

export default AddressListItem;
