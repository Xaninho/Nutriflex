'use client';
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Tabs from "@/components/layout/Tabs";
import useProfile from "@/components/useProfile";
import Link from "next/link";
import { useState } from "react";
import toast from 'react-hot-toast';
import {redirect} from "next/navigation";

export default function NewMenuItemPage() {
    
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();
  
    async function handleFormSubmit(ev, data) {
      ev.preventDefault();
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/menu-items', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok)
          resolve();
        else
        console.log('errozito')
          reject();
      });
  
      await toast.promise(savingPromise, {
        loading: 'Saving this tasty item',
        success: 'Saved',
        error: 'Error',
      });
  
      setRedirectToItems(true);
    }
  
    if (redirectToItems) {
      return redirect('/menu-items');
    }
  
    if (loading) {
      return 'Loading user info...';
    }
  
    if (!data.admin) {
      return 'Not an admin.';
    }
  
    return (
        <section className="mt-8">
            <Tabs isAdmin={true} />

            <div className="mt-8">
                <Link href="/menu-items" className="button justify-center">
                  <Left />
                  <span>Show all menu items</span>
                </Link>
            </div>

           <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />

        </section>
    );
}