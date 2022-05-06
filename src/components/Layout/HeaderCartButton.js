import {useContext , useEffect , useState} from 'react';
import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';


const HeaderCartButton=props=> {
  const [btnIsHighlighted , setBtnIsHighlighted] = useState(false);
  const CartCtx = useContext(CartContext);
  /*Here we could have used the length method to know the number of meal items added to cart but we are not doing so
  This is because if the user enters that 3 "sushi" to be added to cart then he specifies the meal item and the amount 
  to be added , now if the item.length would be used then he won't get the actual length because it depends on the
  amount . 

  Hence we will use the reduce function . Cart item have objects which have a amount field which stores the number 
  of a particualr item selected . 
  
  */
  const numberOfCartItems = CartCtx.items.reduce((curNumber , item)=>{
    return curNumber+item.amount; /*it think this reduce will point at every item of the array of object items through item pointer */
  },0);/*This 0 is to initialise currnumber  */

  const {items} = CartCtx;
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`; /*Dont worry this line dont need to go under the useEffect because in useEffect you we have called the state updating function there which will re-evaluate the component and this line will be detected then.  */


  useEffect(()=>{
    if(items.length===0)
    {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
    },300);

    return () => {
      clearTimeout(timer);
    };

  },[items]);

  return (
    
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>   {/*For Icon */}
            <span>Your Cart</span>   {/*For Some Text*/}
            <span className={classes.badge}> {/*For badge that will show the current number of items in the cart */}
               {numberOfCartItems} {/*For the moment we dont have the logic to implement that here therefore providing it a dummy value  */}
            </span>   {/*For badge that will show the current number of items in the cart */}
        </button>
    
  );
};

export default HeaderCartButton;
