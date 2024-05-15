'use client';
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import Tabs from "@/components/layout/Tabs";
import useProfile from "@/components/useProfile";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";
import toast from 'react-hot-toast';

export default function NewMenuItemPage() {
    
    const {loading, data} = useProfile();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [image, setImage] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(ev: any) {
        ev.preventDefault();
        const data = {image, name, description, basePrice};

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
            <form className="mt-8 max-w-md max-auto" onSubmit={handleFormSubmit}>
                <div className="flex items-end gap-2">
                    <div className="max-w-[200px]">
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label> Item Name </label>
                        <input
                            value={name}
                            onChange={ev => setName(ev.target.value)} 
                            type="text" />
                        <label> Item Description </label>
                        <input
                            value={description}
                            onChange={ev => setDescription(ev.target.value)} 
                            type="text" />
                        <label> Base Price </label>
                        <input
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)} 
                            type="text" />
                        <button type="submit">Save</button>
                    </div>
                    
                </div>

            </form>

        </section>
    );
}