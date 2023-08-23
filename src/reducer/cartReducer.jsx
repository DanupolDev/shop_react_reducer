const CartReducer = (state, action) => {
  //กระบวนการจัดการ state ผ่าน action
  if (action.type === "CACULATE_TOTAL") {
    const { total, amount } = state.products.reduce(
      (cartTotal, item) => {
        const { price, quantity } = item;
        const totalprice = price * quantity; //ยอมรวมสินค้าแต่ละรายการ
        cartTotal.total += totalprice;
        cartTotal.amount += quantity;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    return {
      ...state,
      total,
      amount,
    };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      products: state.products.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === "ADDQUANTITY") {
    let updateProduct = state.products.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      products: updateProduct,
    };
  }
  if (action.type === "SUBTRACT") {
    let updateProduct = state.products
      .map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
    return {
      ...state,
      products: updateProduct,
    };
  }
};
export default CartReducer;