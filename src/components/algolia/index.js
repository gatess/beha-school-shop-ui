import React from 'react';
import {Layout} from "antd";
import {Configure, connectHits, connectStateResults, InstantSearch, Pagination, Stats,} from 'react-instantsearch-dom';
import {withUrlSync} from './urlSync';
import 'instantsearch.css/themes/algolia.css';
//import './style.css'
import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";
import ProductList from "./ProductList";
import algoliasearch from 'algoliasearch/lite';

const {Content} = Layout;

/*const searchClient = algoliasearch(
  '5E39RTUARA',
  '94b47e297b3a303402aa7da95dd595ed'
);*/
const searchClient = algoliasearch(
  '318X71CBOQ',
  '5260b22efaef438bd0c6719a4d65bbb9'
);

const AlgoliaApp = props => (
  <div className="gx-main-content-wrapper">
  <InstantSearch className="gx-main-content"
                 indexName="beha_school"
                 searchState={props.searchState}
                 createURL={props.createURL}
                 searchClient={searchClient}
                 onSearchStateChange={props.onSearchStateChange}>

    <Configure hitsPerPage={16} clickAnalytics />

    <Layout className="gx-algolia-layout-has-sider">
      <Sidebar style={{width:"200px"}}/>
      <div className="gx-algolia-main">
        <Header/>
        <Content className="gx-algolia-content">
          <CustomResults/>
          
        </Content>
        <Footer>
          <Pagination showLast={true}/>
        </Footer>
      </div>
    </Layout>
  </InstantSearch>
  </div>
);


const CustomResults = connectStateResults(({searchState, searchResult}) => {
  if (searchResult && searchResult.nbHits === 0) {
    return (
      <div className="gx-algolia-content-inner">
        <div className="gx-algolia-no-results">
          No results found matching{' '}
          <span className="gx-algolia-query">{searchState.query}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="gx-algolia-content-inner">
        <Stats/>
        <ConnectedProducts/>
      </div>
    );
  }
});

const ConnectedProducts = connectHits(ProductList);

export default withUrlSync(AlgoliaApp);
