import React from 'react';
import style from '../../styles/scss/style.scss';
import CartItem from '../component/CartItem';
import CartBill from '../component/CartBill';
import CartEdit from '../component/CartEdit';

class Cart extends React.Component {
    static get defaultProps() {
        return {};
    }
    constructor(props) {
        super();
        this.state = {
            productsInCart: props.data.productsInCart
        };
    }
    updateData(newData) {
        this.setState({
            productsInCart: newData
        });
    }
    render() {
        return (
            <div className="container">
                <header>
                    <h1> YOUR SHOPPING BAG</h1>
                </header>
                <main>
                    <CartItem updateData={this.updateData.bind(this)} productsInCart={this.state.productsInCart} />
                    <CartBill productsInCart={this.state.productsInCart} />
                </main>
            </div>
        );
    }
}

export default Cart;
