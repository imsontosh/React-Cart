import React from 'react';

class CartItem extends React.Component {
    static get defaultProps() {
        return {};
    }
    constructor(props) {
        super();
    }
    updateData(item, index) {
        console.log('item', item, index);
        this.props.productsInCart[index] = item;
        this.props.updateData(this.props.productsInCart);
    }

    render() {
        const self = this;
        return (
            <div className="cart-grid">
                <div className="">
                    <div className="row cart-grid-header">
                        <div className="col-sm-7"><strong>{this.props.productsInCart.length}</strong> ITEMS</div>
                        <div className="col-sm-1">SIZE</div>
                        <div className="col-sm-1 text-center">QTY</div>
                        <div className="col-sm-1">PRICE</div>
                    </div>
                    <ul>
                        {this.props.productsInCart.map(function(data, index) {
                            return (
                                <CartItemContent
                                    updateData={self.updateData.bind(self)}
                                    key={data.p_id}
                                    index={index}
                                    item={data}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

class CartItemContent extends React.Component {
    static get defaultProps() {
        return {};
    }
    constructor(props) {
        super();
        this.state = {
            quantity: props.item.p_quantity
        };
    }
    handleChange(event) {
        this.setState({
            quantity: event.target.value
        });
        this.props.item.p_quantity = !event.target.value ? 0 : parseInt(event.target.value);
        this.props.updateData(this.props.item, this.props.index);
    }

    render() {
        const imagePath = '/src/styles/images/';
        const priceCheck = this.props.item.p_originalprice === this.props.item.p_price;
        return (
            <div className="cart-item-parent">
                <div className="row row-bordered">
                    <div className="col-xs-12 col-sm-7">
                        <div className="row">
                            <div className="col-xs-4">
                                <img src={imagePath + 'T' + this.props.item.p_id + '.jpg'} />{' '}
                            </div>
                            <div className="col-xs-8 item-detail">
                                <div className="text-uppercase main-detail">
                                    {this.props.item.p_variation} {this.props.item.p_name}
                                </div>
                                <div className="sub-detail">Style #: {this.props.item.p_style}</div>
                                <div className="sub-detail">Color: {this.props.item.p_selected_color.name}</div>
                                <div>
                                    <div className="xs-visible sub-detail">

                                        <div className="row ">
                                            <div className="col-xs-3">Quantity : </div>
                                            <div className="col-xs-2">
                                                <div>
                                                    <input
                                                        type="text"
                                                        onChange={this.handleChange.bind(this)}
                                                        value={this.state.quantity}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {!priceCheck
                                            ? <div className="cross-detail">
                                                  Price:
                                                  {this.props.item.c_currency}
                                                  {this.props.item.p_price.toFixed(2)}
                                              </div>
                                            : <div>
                                                  Price:
                                                  {this.props.item.c_currency}
                                                  {(this.props.item.p_quantity *
                                                      this.props.item.p_originalprice).toFixed(2)}
                                              </div>}
                                        {!priceCheck
                                            ? <div>
                                                  Price:
                                                  {this.props.item.c_currency}
                                                  {(this.props.item.p_price * this.props.item.p_quantity).toFixed(2)}
                                              </div>
                                            : null}
                                    </div>

                                </div>
                                <div className="button-container">
                                    <a className="inline">Edit</a>
                                    <a className="inline">Remove</a>
                                    <a className="inline">Save For Later</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xs-hidden col-sm-1">{this.props.item.p_selected_size.code}</div>
                    <div className="xs-hidden col-sm-1">
                        <div>
                            <input type="text" onChange={this.handleChange.bind(this)} value={this.state.quantity} />
                        </div>
                    </div>
                    <div className="xs-hidden col-sm-1">

                        {!priceCheck
                            ? <div className="cross-detail">
                                  {this.props.item.c_currency}
                                  {this.props.item.p_price.toFixed(2)}
                              </div>
                            : <div>
                                  {this.props.item.c_currency}
                                  {(this.props.item.p_quantity * this.props.item.p_originalprice).toFixed(2)}
                              </div>}
                        {!priceCheck
                            ? <div>
                                  {this.props.item.c_currency}
                                  {(this.props.item.p_price * this.props.item.p_quantity).toFixed(2)}
                              </div>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;
