import React from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import {useRef ,useState} from 'react';

const MealItemForm=props=> {

  const [amountIsValid,setAmountIsValid] = useState(true);

  const amountInputRef = useRef();
  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
      setAmountIsValid(false);
      return;
    };
    
    props.onAddToCart(enteredAmountNumber);

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input label="amount" ref={amountInputRef} input={{
            id:'amount_'+props.id,
            type:'number',
            min:'1',
            step:'1',
            defaultValue:'1'
        }}></Input>
        <button>+ ADD</button>
        {!amountIsValid&&<p>Please enter amount between 1 to 5</p>}
    </form>
  )
}

export default MealItemForm;
