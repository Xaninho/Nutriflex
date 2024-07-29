'use client';
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Tabs from "@/components/layout/Tabs";
import useProfile from "@/components/useProfile";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';


export default function EditMenuItemPage() {

    const {id} = useParams();
    const {loading, data} = useProfile();
    const [menuItem, setMenuItem] = useState(null);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            });
        });
    }, []);

    async function handleFormSubmit(ev: any, data : any) {
        ev.preventDefault();

        data = {...data, _id: id};

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

        await savingPromise;

    }

    async function handleDeleteClick() {
        const deletionPromise = new Promise(async (resolve, reject) => {
            const response = await fetch(`/api/menu-items?_id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Item deleted!');
                resolve();
            } else {
                reject();
            }
        });

        await deletionPromise;
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

           <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>

           <div className="max-w-xs ml-auto mt-4 pl-4">
                <div className="border max-w-ws ml-auto pl-4">
                    <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick} />
                </div>
           </div>

        </section>
    );
}