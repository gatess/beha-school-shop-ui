import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Card, message , Spin } from 'antd';
import { BookOutlined , PlusSquareOutlined , LoadingOutlined , LogoutOutlined} from '@ant-design/icons';
import ProductTable from '../components/teacher/ProductTable';
import ProductModal from '../components/teacher/ProductModal';
import { useHistory } from "react-router-dom";
import UserProfile from "../components/sidebar/UserProfile";

const {  Content, Sider } = Layout;


const TeacherAddProduct = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [sideMenu, setSideMenu] = useState();
  const [products,setProducts] = useState([]);
  const [tempProducts,setTempProducts] = useState([]);
  const [selectedLesson,setSelectedLesson]=useState();
  const [productModalStatus, setProductModalStatus] = useState(false);
  const [spinActive, setSpinActive] = useState(false);
  let lessons = JSON.parse(localStorage.getItem("lessons"));
  const [lesson,setLesson] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setLesson(lessons);
    debugger;
    let menu = lessons.map((lessons, index) => 
    <Menu.Item key={lessons.id} value={lessons.id}><BookOutlined />{lessons.gradeName+" "+lessons.name}</Menu.Item>);
    setSideMenu(menu);
}, []);




const navigateProductInfo = () => {

  let request = {          
    id: selectedLesson,
    shopLists: products  
  }
  console.log(request);
  if(request!=null){
  setSpinActive(true);
  fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/teacher/addShopList/", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.status === 's') {
                            debugger;
                            setSpinActive(false);
                            message.success('Ürünler başarıyla eklendi');
                            //*const lessonsArray = lessons.filter(item => item.id==selectedLesson); 
                            let tempLesson = lesson;
                            tempLesson.forEach(l => {
                              if(l.id==selectedLesson) {
                                l.shopLists=products;
                                debugger;
                              }
                            });
                            debugger;
                            setLesson(tempLesson);
                            let productLine = JSON.parse(localStorage.getItem('productLine')); 
                            productLine.shopLists=tempLesson[0].shopLists;
                            debugger;
                            localStorage.setItem('productLine', JSON.stringify(productLine));
                            localStorage.setItem('lessons', JSON.stringify(tempLesson));
                            //*let lessonSelected=lessonsArray[0];
                            //*lessonsArray[0].shopLists=products;
                            //*setLesson(lessons);
                            console.log(lesson);
                            
                        } else {
                            message.error(result.message);
                            setSpinActive(false);
                        }
                    },
                    (error) => {
                        message.error(error);
                        console.log(error);
                    }
                );
              }
              else{
                message.error("Liste boş!");
              }

}
const addProduct = () => {
  debugger;
  
}

const onQuantityChange = (key, quantity) => {
  debugger;
  let tempCart = products;
  setTempProducts(tempCart);
  tempCart.forEach(cart => {
    if (cart.product.barcode === key) {
      cart.quantity = quantity;
    }
  })
  setProducts(tempCart);
}

const onDeleteProduct = (key) => {
  debugger;
  let sc = [...products];
  console.log(sc.filter(item => item.product.barcode == key));
  let temp=sc.filter(item => item.product.barcode != key);
  setProducts(temp);
  console.log(products);
  let productLine = JSON.parse(localStorage.getItem('productLine'));
  productLine.shopLists = temp;
  localStorage.setItem('productLine', JSON.stringify(productLine));
 

}


const handleClick = e => {
  if(e.key=="signOut") {
    signOutTeacher();
  } else {
  setProducts(products);
  debugger;
  console.log('click ', e);
  setSelectedLesson(e.key);
  getProduct(e.key);
  debugger;
  }
};


const getProduct = (id) => {
  debugger;
  localStorage.setItem('selectedLessonId',JSON.stringify(id));
  const productLine = lesson.filter(item => item.id==id);
  let firstProduct=productLine[0];
  localStorage.setItem('productLine',JSON.stringify(firstProduct));  
  let shopList=firstProduct.shopLists;
  setProducts(shopList);
  console.log(shopList);
}

const handleCancel = () => {
  debugger;
  let productLine = JSON.parse(localStorage.getItem('productLine')); 
  setProducts(productLine.shopLists);
  setProductModalStatus(false);
}

const signOutTeacher = () => {
  debugger;
  localStorage.removeItem('lessons');
  localStorage.removeItem('teacherId');
  localStorage.removeItem('selectedLessonId');
  localStorage.removeItem('productLine');
  history.push({
    pathname: '/teacher'      
  });
}

  return (
    <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
        <div className="gx-sidebar-notifications">
    <UserProfile menuType="teacher"/>
    </div>
      <Menu onClick={handleClick}
       mode="inline" defaultSelectedKeys={['0']}>
        {sideMenu}
        <Menu.Item key="signOut" ><LogoutOutlined />Çıkış Yap</Menu.Item>
      </Menu>
    </Sider>
    <Layout><Content style={{ margin: '24px 16px 0' }}>
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
    <Spin indicator={antIcon} spinning={spinActive} >
    <Card title="Ürünler" extra={<a onClick={() => setProductModalStatus(true)} ><PlusSquareOutlined /> Ürün Ekle</a>}>
        
           <ProductTable  deleteProduct={onDeleteProduct} product={products} quantityChange={onQuantityChange}></ProductTable>
           <ProductModal onCancel={handleCancel} addProduct={addProduct} open={productModalStatus} />
           <Button style={{marginTop:"20px", float:"right"}}  onClick={navigateProductInfo}
           type="primary" >Kaydet</Button>
        </Card>
        </Spin>
        </div>
      </Content>
    </Layout>
  </Layout>
    
  );
};



export default TeacherAddProduct;