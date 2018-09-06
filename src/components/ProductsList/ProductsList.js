import React from "react";
import { chunk } from "lodash";
import { Row, Col } from "antd";
import { ProductItem } from "..";

const ProductsList = ({ products, onAddToCart }) => {
  return (
    <div data-test-id="products-list">
      {chunk(products, 4).map((row, i) => (
        <Row
          type="flex"
          justify="space-around"
          key={`row-${i}`}
          style={{ paddingBottom: "20px" }}
        >
          {row.map(product => (
              <div data-test-id="product-item" key={product.id}>
                <Col span={4}>
                  <ProductItem product={product} onAddToCart={onAddToCart} />
                </Col>
              </div>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default ProductsList;
