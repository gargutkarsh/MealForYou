import React , {useContext , useState} from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart=(props)=> {
    const [isCheckout , setIsCheckout] =useState(false);    
    const [isSubmitting , setIsSubmitting] = useState(false);
    const [didSubmit , setdidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length  > 0;
    const totalAmount = `Rupees ${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };


    const cartItemAddHandler = item => {
        cartCtx.addItem({...item,amount:1});
    };

    const orderHandler = () =>
    {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://mealforyou-1-default-rtdb.firebaseio.com/orders.json',{method:'POST' , body : JSON.stringify({user : userData , orderedItems:cartCtx.items})});
        setIsSubmitting(false);
        setdidSubmit(true);
        cartCtx.clearCart();
    };

    /*Creating a dummy cart array later we will use the usecontext hook   */
    const cartItem  = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) =>(<CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null , item.id)} onAdd={cartItemAddHandler.bind(null,item)} /> ))}</ul>
    
    const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>
    {hasItems&&<button className={classes.button} onClick={orderHandler}>Order</button>}
</div>


    const cartModalContent = <React.Fragment>
        {/*CartItems */}{cartItem}

        <div className={classes.total}>
           <span>
               Total Amount
           </span>
           <span>
               {totalAmount}
           </span>
            
        </div>{/*total amount */}
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
        {!isCheckout && modalActions}
        
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Other Data ...</p>
    const didSubmitModalContent = <p>Successfully Sent the Order!</p>


  return (
    <Modal onClick={props.onHideCart} > {/*This div will later be turned to a modal component */}
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
