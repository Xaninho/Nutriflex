'use client';
import {CartContext} from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars";
import ShoppingCart from "@/components/icons/ShoppingCart";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useContext, useState} from "react";

function AuthLinks({status, userName} : {status: string, userName: string}) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
    onClick={() => signOut()}
    className="bg-transparent text-gray-500 hover:text-red-500 hover:border-red-500 px-8 py-2 font-medium border rounded-xl transition-colors duration-200 ease-in-out">
    Logout
</button>

      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'} className="hover:text-black transition-all font-medium">Sign In</Link>
        <Link href={'/register'} className="w-[100px] bg-primary h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
 after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]">
          Sign Up
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName: string = userData?.name ?? userData?.email ?? '';

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }
  //@ts-ignore
  const {cartProducts} = useContext(CartContext);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);


  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  return (
    <header className="px-20 p-4 ">
      <div className="flex items-center md:hidden justify-between ">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
          Nutriflex
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link className="hover:text-black transition-all font-medium" href={'/'}>Home</Link>
          <Link className="hover:text-black transition-all font-medium" href={'/menu'}>Menu</Link>
          <Link className="hover:text-black transition-all font-medium" href={'/#about'}>About</Link>
          <Link className="hover:text-black transition-all font-medium" href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            Nutriflex
          </Link>
          <Link className="hover:text-black transition-all font-medium" href={'/'}>Home</Link>
          <Link className="hover:text-black transition-all font-medium" href={'/menu'}>Menu</Link>
          <Link className="hover:text-black transition-all font-medium" href={'/#about'}>About</Link>
          <Link className="hover:text-black transition-all font-medium" href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}