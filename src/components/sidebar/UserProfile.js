import React,{useState,useEffect} from "react";
import { Avatar} from "antd";

const UserProfile = (props) => {
  const [adminName,setAdminName] = useState("a");
  let menuType = props.menuType;
  let teacherName = props.name;
  let adminResult = JSON.parse(localStorage.getItem('adminResult'));
  let schoolAdminResult = JSON.parse(localStorage.getItem('schoolAdminResult'));
  let lessons = JSON.parse(localStorage.getItem("lessons"));
  
  let name=""; 
  useEffect(() => {
    debugger;
    if(menuType=="admin") {
      setAdminName(adminResult.adminName);
    }
    else if(menuType=="schooladmin") {
      setAdminName(schoolAdminResult.schoolName);
    }
    else if(menuType=="teacher") {
      debugger;
      setAdminName(lessons[0].teacher.name);
    }
    else{
      setAdminName("adminResult.schoolName");}
  }, [menuType]);
 
  return (
    <div>
    <div className="gx-flex-row gx-align-items-center gx-avatar-row gx-justify-content-center">
      <Avatar src='https://via.placeholder.com/150x150'
                className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
        <span style={{paddingTop:"15px"}} className="gx-avatar-name">{adminName}</span>

    </div>
    </div>

  )
};

export default UserProfile;
