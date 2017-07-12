import React from 'react';
import _ from 'lodash';

class CartBill extends React.Component {
  static get defaultProps() {
    return {};
  }
  constructor(props) {
    super();
    this.state = {
      productsInCart: props.productsInCart
    };
  }
  calculateSum() {
    const priceList = _.map(this.state.productsInCart, function(data) {
      return data.p_price * data.p_quantity;
    });
    return _.sum(priceList).toFixed(2);
  }
  calculateDiscount() {
    const productCount = _.sumBy(this.state.productsInCart, 'p_quantity');
    let discount = 0;
    if (productCount === 3) {
      discount = 5;
    } else if (productCount > 3 && productCount < 10) {
      discount = 10;
    } else if (productCount > 10) {
      discount = 25;
    }
    return (this.calculateSum() * discount / 100).toFixed(2);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      productsInCart: nextProps.productsInCart
    });
  }
  render() {
    return (
      <div className="cart-bill">
        <div className="row">
          <div className="col-sm-4 cust-details xs-hidden">
            <ul>
              <li>Need help or have question</li>
              <li>Call Customer Services at 1-800-555-5555</li>
              <li><a className="inline">Chat with one of our stylists</a></li>
              <li><a className="inline">See return & exchange policy </a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-8 bill-detail">
            <div className="row">
              <div className="col-sm-8">SUBTOTAL</div>
              <div className="col-sm-4">${this.calculateSum()}</div>
            </div>
            <div className="row">
              <div className="col-sm-8">PROMOTION CODE</div>
              <div className="col-sm-4">-${this.calculateDiscount()}</div>
            </div>
            <div className="row">
              <div className="col-sm-8">ESTIMATED SHIPPING</div>
              <div className="col-sm-4">Free</div>
            </div>
            <div className="row ">
              <div className="col-sm-8 ">
                <div className="final-total">ESTIMATED TOTAL</div>
                <div className="final-total-sub">Tax will be applied during checkout</div>
              </div>
              <div className="col-sm-4 ">
                ${(this.calculateSum() - this.calculateDiscount()).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartBill;
