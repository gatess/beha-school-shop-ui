import React from "react";
import { Col, Row } from "antd";
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "../components/admin/ChartCard";
import EcommerceStatus from "../components/admin/EcommerceStatus";
import TrafficRaiseCard from "../components/admin/TrafficRaiseCard";
import TotalEncomeCard from "../components/admin/TotalEncomeCard";
import QueriesCard from "../components/admin/QueriesCard";
import Auxiliary from "../components/admin/Auxiliary";
import { increamentData, lineData2 } from "../components/admin/data"


const Admin = () => {
  let adminResult = JSON.parse(localStorage.getItem("adminResult"));
  let ordersSum = adminResult ? Number(adminResult.ordersSum.toFixed(2)) : [];
  let commissionSum = adminResult ? Number(adminResult.comissionSum.toFixed(2)) : [];
  let orderDashboardDetail = adminResult ? adminResult.orderDashboardDetail : [];
  let customerQuantityListData = adminResult ? adminResult.customerQuantity : [];
  let orderTotalList = [];
  let orderQuantityList = [];
  let customerQuantityList = [];
  let i = 0;
  orderDashboardDetail.forEach(orderDetail => {
    orderTotalList = [...orderTotalList, { name: orderDetail.date, tutar: orderDetail.orderTotal }];
    orderQuantityList = [...orderQuantityList, { name: orderDetail.date, adet: orderDetail.orderQuantity }];
    customerQuantityList = [...customerQuantityList, { name: orderDetail.date, adet: customerQuantityListData[i] }];
    i++;
  });

  

  return (
    <div className="gx-main-content-wrapper">
      <Auxiliary style={{ padding: 30 }}>
        <Row >
          <Col xl={4} lg={8} md={8} sm={12} xs={24}>
            <EcommerceStatus color="orange" icon="add" title={adminResult.newOrderQuantity} colorTitle="geekblue"
              subTitle="Yeni Sipariş" colorSubTitle="geekblue" />
          </Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={24}>
            <a href="/orderlist">
              <EcommerceStatus icon="orders" title={adminResult.allOrderQuantity} colorTitle="geekblue"
                subTitle="Toplam Sipariş" colorSubTitle="geekblue" /></a>
          </Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={24}>
            <EcommerceStatus icon="user" title={adminResult.allCustomerQuantity} colorTitle="primary" subTitle="Toplam Müşteri"
              colorSubTitle="grey" />
          </Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={24}>
            <EcommerceStatus icon="product-list" title={adminResult.allProductQuantity} colorTitle="primary" subTitle="Toplam Ürün"
              colorSubTitle="grey" />
          </Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={24}>
            <EcommerceStatus color="geekblue" icon="revenue-new" title={ordersSum + "TL"} colorTitle="primary"
              subTitle="Toplam Satış" colorSubTitle="grey" />
          </Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={24}>
            <EcommerceStatus icon="diamond" title={commissionSum + "TL"} color="geekblue" colorTitle="primary" subTitle="Toplam Komisyon"
              colorSubTitle="grey" />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard title="Sipariş" children={
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart data={orderQuantityList}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip />
                  <defs>
                    <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#163469" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#FE9E15" stopOpacity={0.9} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="adet" strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color3)" fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>} styleName="up" desc="Haftalık sipariş sayısı." />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard title="Satış" children={
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart data={customerQuantityList}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip />
                  <defs>
                    <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9} />
                    </linearGradient>
                  </defs>

                  <Area dataKey="adet" type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color4)"
                    fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>} styleName="up" desc="Haftalık satış tutarı." />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard title="Müşteri" children={
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart data={increamentData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip />
                  <defs>
                    <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e81a24" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FEEADA" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="price" strokeWidth={0} stackId="2" stroke='#FEEADA' fill="url(#color5)" fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>} styleName="down" desc="Haftalık yeni müşteri sayısı." />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard title="Komisyon" children={
              <ResponsiveContainer width="100%" height={75}>
                <LineChart data={lineData2}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Tooltip />
                  <Line dataKey="traffic" stroke="#038FDE" dot={{ stroke: '#FEA931', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>} styleName="up" desc="Haftalık komisyon tutarı." />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <TrafficRaiseCard />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <TotalEncomeCard />
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <QueriesCard />
          </Col>




        </Row>

      </Auxiliary>
    </div>
  );
};
export default Admin;
