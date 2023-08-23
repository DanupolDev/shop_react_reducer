import { Item } from "./index";
import { useCart } from "../context/CartContext";
export default function Cart() {
  const { products, total, formatMoney } = useCart();
  return (
    <div className="cart">
      <h1 style={{ textAlign: "center" }}>
        {products.length > 0
          ? `ยอดเงินรวมที่ต้องชำระ : ${formatMoney(total)} บาท`
          : `ไม่มีสินค้าในตะกร้า`}
      </h1>
      {products.map((data) => (
        <Item key={data.id} {...data} />
      ))}
    </div>
  );
}
