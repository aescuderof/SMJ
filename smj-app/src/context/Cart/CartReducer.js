const CartReducer = (globalState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const incomingItem = action.payload;
      const existingItem = globalState.items.find((item) => item.id === incomingItem.id);

      if (existingItem) {
        return {
          ...globalState,
          items: globalState.items.map((item) =>
            item.id === incomingItem.id
              ? { ...item, quantity: item.quantity + incomingItem.quantity }
              : item
          ),
        };
      }

      return {
        ...globalState,
        items: [...globalState.items, incomingItem],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...globalState,
        items: globalState.items.filter((item) => item.id !== action.payload),
      };

    case 'SET_ITEM_QUANTITY': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...globalState,
          items: globalState.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...globalState,
        items: globalState.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'OPEN_CART':
      return {
        ...globalState,
        isOpen: true,
      };

    case 'CLOSE_CART':
      return {
        ...globalState,
        isOpen: false,
      };

    default:
      return globalState;
  }
};

export default CartReducer;