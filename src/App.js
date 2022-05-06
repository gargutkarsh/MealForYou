import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals'; 
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsShown,setCartIsShown] = useState(false);

  const showCartHandler=()=>
  {
      setCartIsShown(true);
  }

  const hideCartHandler=()=>
  {
    setCartIsShown(false);
  }

  return (
    <CartProvider> {/*This fragement can now be replaced with the cartprovider component */}
      {/*Now, you learn that if you have a prop chain like this,

      where you pass a prop through multiple levels of components,

      could be replaced with context.

      And indeed we could use context here,

      for handling this Cart visibility state. */}

      

       {/*Since we need to add and remove item from the cart , we are using context and in this file
          the header needs cart context : because it need to update the badge so that we can show the present number of item in the cart
          the cart needs cart context : so that the added item enters the cart
          the meals need acces to the cart beacuse we want to add items in the cart on the button click of add item */}

      {cartIsShown && <Cart onHideCart={hideCartHandler} />} {/* Since we render the cart here and we want a conditon over it that this component appears only when the button is clicked therefore we will use useState hook here only*/}
      <Header onShowCart={showCartHandler}  /> {/*Since the cart button is in this component we need to find this showCartHandler to that component and to do that we need a custom handler */}
      <main>
        <Meals />
      </main>
      
    </CartProvider>
  );
}

export default App;
