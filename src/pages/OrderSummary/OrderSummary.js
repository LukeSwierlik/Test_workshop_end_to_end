import React, { Component } from "react";
import { List, Button } from "antd";
import { Redirect } from "react-router-dom";
import { Layout, CartItem } from "../../components";
import { find } from "lodash";
import deliveryMethods from "../../data/deliveryMethods.json";
import countries from "../../data/countries.json";

class OrderSummary extends Component {
  onSubmitOrder = () => {
    this.props.submitOrder();
    this.props.history.push("/");
  };

  getOrderTotal() {
    const { order } = this.props;
    const { products = [], deliveryMethod } = order;
    const selectedDeliveryMethod = find(deliveryMethods, {
      id: deliveryMethod
    });

    let priceSum = 0;

    products.map(item => {
      priceSum += item.product.price * item.quantity;
      return item;
    });

    priceSum += selectedDeliveryMethod.price;

    return Math.round(priceSum * 100) / 100;
  }

  render() {
    const { cartSummary, order } = this.props;
    const {
      orderNumber,
      products = [],
      deliveryAddress,
      deliveryMethod
    } = order;

    if (!orderNumber || typeof orderNumber === "undefined") {
      return <Redirect to="/" />;
    }

    const selectedCountry = find(countries, { value: deliveryAddress.country });
    const selectedDeliveryMethod = find(deliveryMethods, {
      id: deliveryMethod
    });

    return (
      <Layout cartSummary={cartSummary}>
        <h2>Order #{orderNumber} has been placed</h2>

        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={products}
          renderItem={item => (
            <CartItem
              product={item.product}
              quantity={item.quantity}
              readOnly
            />
          )}
        />
        <div
          style={{
            marginTop: 12,
          }}
        >
          <p>
            <strong>Delivery address</strong>
          </p>
          <p data-test-id="deliveryAddressFullname">
            Full name:&nbsp;
            <strong>{deliveryAddress.fullname}</strong>
          </p>
          <p data-test-id="deliveryAddressStreet">
            Street:&nbsp;
            <strong>{deliveryAddress.street}</strong>
          </p>
          <p data-test-id="deliveryAddressCity">
            City:&nbsp;
            <strong>{deliveryAddress.city}</strong>
          </p>
          <p data-test-id="deliveryAddressContry">
            Country:&nbsp;
            <strong>{selectedCountry.label}</strong>
          </p>
        </div>
        <div
          style={{
            marginTop: 12,
          }}
        >
          <p>
            <strong>Shipping method</strong>
          </p>
          <p data-test-id="deliveryAddressDeliveryMethod">{selectedDeliveryMethod.name}</p>
          <p data-test-id="deliveryAddressDeliveryCost">
            Delivery cost:
              <span>{selectedDeliveryMethod.price}</span>
            zł
          </p>
        </div>
        <div
          style={{
            marginTop: 12,
          }}
        >
          <p data-test-id="sum">
            <strong>
              Your order total:
              <span>
                {this.getOrderTotal()}
              zł
              </span>
            </strong>
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px"
          }}
        >
          <Button key="btn-order" type="primary" onClick={this.onSubmitOrder}>
            Finish your order
          </Button>
        </div>
      </Layout>
    );
  }
}

export default OrderSummary;
