import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from './cartSlice';

const UpdateQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity({ id: pizzaId }));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity({ id: pizzaId }));
  };

  return (
    <>
      <Button onClick={handleIncrement}>+</Button>
      <span className="px-2 font-medium">{currentQuantity}</span>
      <Button onClick={handleDecrement}>-</Button>
    </>
  );
};

export default UpdateQuantity;
