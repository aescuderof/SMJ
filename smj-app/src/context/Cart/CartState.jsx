import { useEffect, useMemo, useReducer } from 'react';
import CartContext from './CartContext';
import CartReducer from './CartReducer';

const CART_STORAGE_KEY = 'smj_cart_items';

const toNumber = (value) => {
  if (typeof value === 'number') {
    return value;
  }

  const parsed = Number(String(value).replace(/[^\d.,-]/g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const getInitialItems = () => {
  try {
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedItems) {
      return [];
    }

    const parsedItems = JSON.parse(storedItems);
    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch {
    return [];
  }
};

const CartState = (props) => {
  const initialState = {
    items: getInitialItems(),
    isOpen: false,
  };

  const [globalState, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (product, quantity = 1) => {
    if (!product) {
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product._id || product.idProd || product.slug || product.id,
        name: product.nombre || product.name,
        price: toNumber(product.precio || product.price),
        quantity,
        imageSrc: product.images?.[0] || product.img || product.imageSrc,
        imageAlt: product.descripcion || product.name || 'Producto',
        color: product.color || 'Único',
        href: `/products/${product.slug}`,
      },
    });

    dispatch({ type: 'OPEN_CART' });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: itemId,
    });
  };

  const setItemQuantity = (itemId, quantity) => {
    dispatch({
      type: 'SET_ITEM_QUANTITY',
      payload: {
        id: itemId,
        quantity,
      },
    });
  };

  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const itemCount = useMemo(
    () => globalState.items.reduce((total, item) => total + item.quantity, 0),
    [globalState.items]
  );

  const subtotal = useMemo(
    () => globalState.items.reduce((total, item) => total + item.price * item.quantity, 0),
    [globalState.items]
  );

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(globalState.items));
    } catch {
      return;
    }
  }, [globalState.items]);

  const providerValue = useMemo(
    () => ({
      items: globalState.items,
      isOpen: globalState.isOpen,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      setItemQuantity,
      openCart,
      closeCart,
    }),
    [globalState.items, globalState.isOpen, itemCount, subtotal]
  );

  return <CartContext.Provider value={providerValue}>{props.children}</CartContext.Provider>;
};

export default CartState;