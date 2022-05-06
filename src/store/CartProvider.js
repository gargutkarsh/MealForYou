/*Because in here I wanna add our cart provider component

which receives props and of course

which I export and the goal

of this component is simply to manage the current context

to data and provide that context

to all components that want access to it.

And for that here, I will import cart context

from ./cart-context and then return JSX code

because this is a component where I simply

access cartcontext.provider. */

import { useReducer } from 'react'; /*Since we need to check whether the mealis a part of the cart or not ad then update the list therefore we will be using the use reducer hook there */
import CartContext from "./cart-context";

/*we create the reducer out of the component because it must not be created agai and again when the component is revaluated */

const defaultCartState ={
    items : [],
    totalAmount:0
};

const cartReducer = (state , action) => {
    if(action.type==='ADD')
    {   const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        
        const existingCartItemIndex = state.items.findIndex(
            (item)=>item.id === action.item.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem)
        {
            const updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
        
        

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        };

    }

    if(action.type==='REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            (item)=>item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1)
        {
            updatedItems = state.items.filter(item=>item.id!==action.id);
        }
        else{
            const updatedItem = {...existingItem, amount:existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }

        return {
            items : updatedItems,
            totalAmount:updatedTotalAmount
        }
    }

    if(action.type==='CLEAR')
    {
        return defaultCartState;
    }


    return defaultCartState;
}

const CartProvider = props =>{

    const [cartState ,dispatchCartAction ] = useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type:'ADD' , item:item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type:'REMOVE',id:id});
    };

    const clearCartHandler =()=>{
        dispatchCartAction({type:'CLEAR'});
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem : addItemToCartHandler,
        removeItem : removeItemFromCartHandler,
        clearCart : clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>

};

export default CartProvider;

