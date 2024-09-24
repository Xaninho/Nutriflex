'use client';
import {CartContext, cartProductPrice} from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";

export default function OrderPage() {
  const {clearCart} = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const {id} = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id='+id).then(res => {
        res.json().then(orderData => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      })
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  subtotal = parseFloat(subtotal.toFixed(2));

  return (
    <section className="max-w-6xl mx-auto px-8">
  <div className="text-center">
    <SectionHeaders mainHeader="Your order" />
    <div className="mt-4 mb-8">
      <p>Thanks for your order.</p>
      <p>We will call you when your order will be on the way.</p>
    </div>
  </div>
  {loadingOrder && (
    <div className="text-center py-8">Loading order...</div>
  )}
  {order && (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
    {/* Coluna de Itens do Pedido */}
    <div className="lg:col-span-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {order.cartProducts.map((product) => (
          <CartProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  
    {/* Coluna de Resumo do Pedido */}
    <div className="bg-gray-100 p-4 rounded-lg h-fit">
      <div className="text-right py-2 text-gray-500">
        Subtotal:
        <span className="text-black font-bold inline-block ml-2">€{subtotal}</span>
        <br />
        Delivery:
        <span className="text-black font-bold inline-block ml-2">€5</span>
        <br />
        Total:
        <span className="text-black font-bold inline-block ml-2">
          {subtotal + 5}€
        </span>
      </div>
      <AddressInputs disabled={true} addressProps={order} />
    </div>
  </div>
  
  )}
</section>

  );
}