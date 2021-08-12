import React from "react";
import { Modal } from "antd";
import AlgoliaApp from '../algolia';

const ProductModal = (props) => {
    return (
    <div>
        <Modal 
            title="Ürün Ekle"
            visible={props.open}
            okText="Kaydet"
            cancelText="Çıkış"
            cancelButtonProps={{ style: { display: 'none' } }}
            centered
            width="80%"
            onOk={props.onCancel}
            onCancel={props.onCancel}
             >
            <AlgoliaApp></AlgoliaApp>
        </Modal>
    </div>
);
};
export default ProductModal;