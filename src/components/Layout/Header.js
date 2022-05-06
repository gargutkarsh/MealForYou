import React from 'react';
import mealsImage from '../../assets/meals.jpg'; 
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';



const Header= props =>{
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>MealForYou</h1>
            <HeaderCartButton onClick={props.onShowCart} /> {/*here we did something unusual that is we passed a function handler to a compoonent as a prop */}
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='A Table full of delicious meal!'/>
        </div>
    </React.Fragment>
  );
};

export default Header;