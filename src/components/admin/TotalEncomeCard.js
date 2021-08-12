import React from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import {Col, Row} from "antd";

import Widget from "./widget/index";
import {trafficData} from "./data"

const TotalEncomeCard = () => {
  return (
    <Widget styleName={`gx-card-full`}>
      <div className="gx-d-flex gx-px-4 gx-pt-4 gx-pb-2">
        <p className="gx-text-uppercase gx-chart-title">komisyon</p>
        <p className="gx-ml-auto gx-text-primary">/Ay</p>
      </div>
      <Row>
        <Col lg={8} md={8} sm={24} xs={24}>
          <div className="gx-actchart gx-pb-5 gx-pl-4">
            <h2 className="gx-fs-xxxl gx-font-weight-medium gx-mb-1 gx-text-black">3.598 TL</h2>
            <p className="gx-mb-0">Aylık komisyon.</p>
          </div>
        </Col>
        <Col lg={16} md={16} sm={24} xs={24}>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={trafficData}
                       margin={{top: 0, right: 0, left: 0, bottom: 0}}>
              <Tooltip/>
              <defs>
                <linearGradient id="color1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#FF55AA" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#E81D27" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <Area dataKey="income" strokeWidth={0} stackId="2" stroke='#867AE5' fill="url(#color1)" fillOpacity={1}/>
            </AreaChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Widget>
  );
};

export default TotalEncomeCard;
