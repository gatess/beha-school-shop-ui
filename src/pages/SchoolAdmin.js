import React from "react";
import {Col, Row} from "antd";
import {Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";

import ChartCard from "../components/admin/ChartCard";
import EcommerceStatus from "../components/admin/EcommerceStatus";
import Auxiliary from "../components/admin/Auxiliary";




const SchoolAdmin = () => {

  let adminResult = JSON.parse(localStorage.getItem("schoolAdminResult"));
let ordersSum= "";
let commissionSum= "";
let orderDashboardDetail =  "";
let customerQuantityListData =  "";
let orderTotalList=[];
let orderQuantityList=[];
let comissionTotalList=[];
let customerQuantityList=[];
let i=0;
if(adminResult){
  if(adminResult.ordersSum!=null){
  ordersSum= Number(adminResult.ordersSum.toFixed(2));}
  if(adminResult.comissionSum!=null){
  commissionSum= Number(adminResult.comissionSum.toFixed(2));}
  orderDashboardDetail = adminResult.orderDashboardDetail;
  customerQuantityListData = adminResult.customerQuantity;
  orderTotalList=[];
  orderQuantityList=[];
  comissionTotalList=[];
  customerQuantityList=[];

 orderDashboardDetail.forEach(orderDetail => {
  orderTotalList= [...orderTotalList ,  {name: orderDetail.date, tutar: orderDetail.orderTotal}];
  orderQuantityList= [...orderQuantityList ,  {name: orderDetail.date, adet: orderDetail.orderQuantity}];
  comissionTotalList= [...comissionTotalList ,  {name: orderDetail.date, tutar: orderDetail.comissionTotal} ];
  customerQuantityList= [...customerQuantityList, {name: orderDetail.date, adet: customerQuantityListData[i]} ];
  i++;
  });
}

  return (
    <div className="gx-main-content-wrapper">
    <Auxiliary style={{ padding: 30 }}>
      <Row >
        <Col xl={4} lg={8} md={8} sm={12} xs={24}>
          <EcommerceStatus icon="orders" title={adminResult.allOrderQuantity} colorTitle="geekblue"
                           subTitle="Toplam Sipariş" colorSubTitle="geekblue"/>
        </Col>
        <Col xl={4} lg={8} md={8} sm={12} xs={24}>
          <EcommerceStatus icon="user" title={adminResult.allCustomerQuantity} colorTitle="geekblue" subTitle="Toplam Müşteri"
                           colorSubTitle="grey"/>
        </Col>
        <Col xl={8} lg={16} md={16} sm={12} xs={24}>
          <EcommerceStatus  icon="revenue-new" title={ordersSum+"TL"} colorTitle="primary"
                           subTitle="Toplam Satış" colorSubTitle="grey"/>
        </Col>
        <Col xl={8} lg={16} md={16} sm={12} xs={24}>
          <EcommerceStatus icon="diamond" title={commissionSum+"TL"} color="orange" colorTitle="primary" subTitle="Toplam Komisyon"
                        colorTitle="geekblue"   colorSubTitle="geekblue"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard title="Sipariş" children={
            <ResponsiveContainer width="100%" height={75}>
              <AreaChart data={orderQuantityList}
                         margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <Tooltip/>
                <defs>
                  <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#163469" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#FE9E15" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
                <Area dataKey="adet" strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color3)" fillOpacity={1}/>
              </AreaChart>
            </ResponsiveContainer>} styleName="up" desc="Haftalık sipariş sayısı."/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard title="Satış" children={
            <ResponsiveContainer width="100%" height={75}>
              <AreaChart data={orderTotalList}
                         margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <Tooltip/>
                <defs>
                  <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>

                <Area dataKey="tutar" type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color4)"
                      fillOpacity={1}/>
              </AreaChart>
            </ResponsiveContainer>} styleName="up" desc="Haftalık satış tutarı."/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard title="Müşteri" children={
            <ResponsiveContainer width="100%" height={75}>
              <AreaChart data={customerQuantityList}
                         margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <Tooltip/>
                <defs>
                  <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e81a24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FEEADA" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <Area dataKey="adet" strokeWidth={0} stackId="2" stroke='#FEEADA' fill="url(#color5)" fillOpacity={1}/>
              </AreaChart>
            </ResponsiveContainer>} styleName="down" desc="Haftalık yeni müşteri sayısı."/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard title="Komisyon" children={
            <ResponsiveContainer width="100%" height={75}>
              <LineChart data={comissionTotalList}
                         margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                <Tooltip/>
                <Line dataKey="tutar" stroke="#038FDE" dot={{stroke: '#FEA931', strokeWidth: 2}}/>
              </LineChart>
            </ResponsiveContainer>} styleName="up" desc="Haftalık komisyon tutarı."/>
        </Col>
   </Row>

    </Auxiliary>
    </div>
  );
};
export default SchoolAdmin;
