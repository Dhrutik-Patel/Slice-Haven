import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addToCart, getCartItemById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import Cart from '../../icons/Cart';
import UpdateQuantity from '../cart/UpdateQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const getCartItem = useSelector(getCartItemById(id));

  const handleAddToCart = () => {
    const pizza = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addToCart(pizza));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {getCartItem?.quantity > 0 && (
            <div className="flex items-center justify-center space-x-3">
              <DeleteItem pizzaId={id} />
              <UpdateQuantity
                pizzaId={id}
                currentQuantity={getCartItem?.quantity}
              />
            </div>
          )}

          {!soldOut && !getCartItem?.quantity > 0 ? (
            <Button type="small" onClick={handleAddToCart}>
              <Cart />
            </Button>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
