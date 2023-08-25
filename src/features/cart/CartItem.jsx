import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateQuantity from './UpdateQuantity';
import { getCartItemById } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const getCartFromId = useSelector(getCartItemById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateQuantity
          pizzaId={pizzaId}
          currentQuantity={getCartFromId?.quantity}
        />

        <DeleteItem pizzaId={pizzaId} q />
      </div>
    </li>
  );
}

export default CartItem;
