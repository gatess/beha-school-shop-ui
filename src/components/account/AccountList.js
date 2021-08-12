import React from "react";

import AccountCell from "./AccountCell";

const AccountList = ({contactList, addFavourite, onContactSelect, onSaveContact, onDeleteContact}) => {
  return (
    <div className="gx-contact-main-content">
      
        <AccountCell onDeleteContact={onDeleteContact}
                     onSaveContact={onSaveContact}
                     addFavourite={addFavourite} onContactSelect={onContactSelect}/>
      

    </div>
  )
};

export default AccountList;
