import React from "react";
import { Dropdown, Menu} from "antd";



const options = [
  'Edit',
  'Delete',
];

const AccountCell = () => {
  
  
  const menus = () => (<Menu onClick={(e) => {
    if (e.key === 'Düzenle') {
      //this.onEditContact()
    
    } else if(e.key === 'Sil') {
      
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

      <div className="gx-contact-item">
        <div className="gx-module-list-icon">
   
        
        </div>

        <div className="gx-module-list-info gx-contact-list-info">
          <div className="gx-module-contact-content">
            <p className="gx-mb-1">
              <span className="gx-text-truncate gx-contact-name"> betül</span>
              <span className="gx-toolbar-separator">&nbsp;</span>
              <span className="gx-text-truncate gx-job-title">designation</span>
            </p>

            <div className="gx-text-muted">
            <span className="gx-email gx-d-inline-block gx-mr-2">
                email,
            </span>
              <span className="gx-phone gx-d-inline-block">0542</span>
            </div>
          </div>

          <div className="gx-module-contact-right">

            <Dropdown overlay={menus()} placement="bottomRight" trigger={['click']}>
              <i className="gx-icon-btn icon icon-ellipse-v"/>
            </Dropdown>

          </div>
        </div>
      </div>
    )
  
}

export default AccountCell;
