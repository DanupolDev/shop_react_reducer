import { createContext, useContext, useEffect, useReducer } from "react";
import products from "../data/products";
import cartReducer from "../reducer/cartReducer";
const initState = {
  products: products,
  total: 0,
  amount: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function removeItem(id) {
    dispatch({ type: "REMOVE", payload: id });
  }
  function addQuantity(id) {
    dispatch({ type: "ADDQUANTITY", payload: id });
  }
  function subtractQuantity(id) {
    dispatch({ type: "SUBTRACT", payload: id });
  }
  useEffect(() => {
    console.log("คำนวณหาผลรวม");
    dispatch({ type: "CACULATE_TOTAL" });
  }, [state.products]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        formatMoney,
        removeItem,
        addQuantity,
        subtractQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
//สร้าง context
const CartContext = createContext();
//การนำเอา context ไปใช้งานข้างนอก
export const useCart = () => {
  return useContext(CartContext);
};
