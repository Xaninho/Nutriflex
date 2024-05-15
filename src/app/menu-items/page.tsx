'use client';
import Right from "@/components/icons/Right";
import Tabs from "@/components/layout/Tabs";
import useProfile from "@/components/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image';


export default function MenuItemsPage() {

    const {loading, data} = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(data => {
                setMenuItems(data);
            })
        })
    }, []);

    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

    return (
       <section className="mt-8 max-w-md mx-auto">
            <Tabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button"
                    href="/menu-items/new">
                        <span>Create new menu item</span>
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8"></h2>
                {menuItems.length > 0 && menuItems.map((menuItem) => (
                    <Link
                    href={`/menu-items/edit/${menuItem._id}`}
                    className=" bg-gray-200 rounded-lg p-4">
                        <div className="relative">
                            <Image src={menuItem.image} alt={menuItem.name} width={200} height={200} />
                        </div>
                       {menuItem.name}
                    </Link>
                ))}
            </div>
       </section>
    );
}