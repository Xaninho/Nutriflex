'use client';
import {CartContext, cartProductPrice} from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import useProfile from "@/components/useProfile";

import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  //@ts-ignore
  const {cartProducts, removeCartProduct} = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const {phone, streetAddress, city, postalCode, country} = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName: string, value: string) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
  }

  async function proceedToCheckout(event : any) {
    event.preventDefault();
    // address and shopping cart products

    const promise = new Promise<void>((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... Please try again later',
    })
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" subHeader="" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
  <div className="text-center">
    <SectionHeaders mainHeader="Cart" subHeader="" />
  </div>
  <div className="flex flex-col lg:flex-row justify-center gap-10 items-start max-w-6xl mx-auto px-4 sm:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-start w-full">
      {cartProducts?.length === 0 && (
        <div className="text-center col-span-full">No products in your shopping cart</div>
      )}
      {cartProducts?.length > 0 &&
        cartProducts.map((product: any, index: number) => (
          <CartProduct key={index} product={product} onRemove={removeCartProduct} />
        ))}
    </div>
    <div className="bg-gray-100 p-6 sm:p-8 rounded-xl flex flex-col gap-6 w-full lg:w-1/3">
      <h2 className="text-lg font-semibold">Checkout</h2>

      <div className="py-2 w-full flex justify-between items-center border-b border-gray-300">
        <div className="text-gray-500">
          Subtotal:<br />
          Delivery:<br />
          Total:
        </div>
        <div className="font-semibold pl-2 text-right">
          ${subtotal}<br />
          $5<br />
          ${subtotal + 5}
        </div>
      </div>

      <form onSubmit={proceedToCheckout} className="w-full">
        <AddressInputs addressProps={address} setAddressProp={handleAddressChange} />
        <button
          className="w-full sm:w-[220px] md:w-[250px] bg-primary h-[40px] sm:h-[45px] md:h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]"
          type="submit"
        >
          Pay ${parseFloat(subtotal + 5)}
        </button>
      </form>
    </div>
  </div>
</section>

  );
}