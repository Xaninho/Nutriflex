'use client';
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Tabs from "@/components/layout/Tabs";
import MenuItem from "@/components/menu/MenuItem";
import useProfile from "@/components/useProfile";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";
import toast from 'react-hot-toast';

export default function NewMenuItemPage() {
    
    const {loading, data} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);
    

    async function handleFormSubmit(ev: any) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                toast.success('Item saved!');
                resolve();
            } else {
                reject();
            }
        });
        
        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (!data.admin) {
        return 'Not an admin.';
    }
    return (
        <section className="mt-8">
            <Tabs isAdmin={true} />
            <div>
                <Left />
                <Link href="/menu-items">
                    <a className="button">
                        <span>Show all menu items</span>
                    </a>
                </Link>
            </div>
           <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />

        </section>
    );
}