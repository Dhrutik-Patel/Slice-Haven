import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from './cartSlice';
import Trash from '../../icons/Trash';

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(removeFromCart(pizzaId));
  };

  return (
    <Button type="small" onClick={handleDeleteItem}>
      <Trash />
    </Button>
  );
};

export default DeleteItem;
