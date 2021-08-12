import React from "react";
import {Layout} from "antd";
import {
  ClearRefinements,
  HierarchicalMenu
} from "react-instantsearch-dom";

const {Sider} = Layout;
const Sidebar = () => (
  
  <Sider className="gx-algolia-sidebar">
    <div className="gx-algolia-sidebar-content">
      <ClearRefinements
        translations={{
          reset: 'Tüm Filtreleri Temizle',
        }}
      />

      <div className="gx-algolia-category-item">
        <div className="gx-algolia-category-title">Sonuçları Göster:</div>
        <HierarchicalMenu
                attributes={[
                  'categories.​lvl0',
                  'categories.​lvl1',
                  'categories.​lvl2',
                ]}
              />
      </div>


 
    </div>
  </Sider>
);


export default Sidebar;

