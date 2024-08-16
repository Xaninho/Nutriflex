'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import {useEffect, useState} from "react";

export default function HomeMenu() {

  const [bestSellers, setBestSellers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="max-w-6xl  mx-auto">
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'check out'}
          mainHeader={'Our Best Sellers'} />
      </div>
      <div className="flex flex-row gap-6">
        {
          bestSellers?.length > 0 && bestSellers.map(item => (
            <MenuItem key={item._id} {...item} />
          ))
        }
      </div>
    </section>
  );
}