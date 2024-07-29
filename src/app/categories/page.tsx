'use client'
import DeleteButton from "@/components/DeleteButton";
import Tabs from "@/components/layout/Tabs"
import useProfile from "@/components/useProfile"
import { useEffect, useState } from "react";

export default function CategoriesPage() {

    async function handleCategorySubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        const creationPromise = new Promise(async(resolve, reject) => {
            
            const data = {name: newCategoryName};

            if (editedCategory) {
                data._id = editedCategory._id;
            }

            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            fetchCategories();
            setCategoryName('');

            if (response.ok) {
                resolve();
            } else {
                reject();
            } 
        });

        creationPromise.then(() => {
            alert('Category created')
        }).catch(() => {
            console.error('Error creating category');
        });
           
    }
    
    const [newCategoryName, setCategoryName] = useState('');
    const {loading : profileLoading, data : profileData} = useProfile();
    const [categories, setCategories] = useState([] as any[]);
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

   function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    } 

    if (profileLoading) {
        return <div>Loading...</div>
    }

    if (!profileData.admin) {
        return <div>Not authorized</div>
    }

    async function handleDeleteClick(_id) {
        console.log('deleting....');

        await fetch('/api/categories?_id=' + _id, {
            method: 'DELETE'
        }).then(() => {
            console.log('delete');
            fetchCategories();
        });
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <Tabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update Category' : 'New Category'}
                            {editedCategory && (
                                <> : <b>{editedCategory.name}</b> </>
                            )}
                        
                        </label>
                        <input type="text" value={newCategoryName} onChange={ev => setCategoryName(ev.target.value)} />
                    </div>
                    <div className="pb-2">
                        <button className="border border-primary">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button onClick={() => {
                            setEditedCategory(null);
                            setCategoryName('');
                        }}>Cancel</button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                {categories?.length > 0 && categories.map((category: any) => {
                    return (
                        <div className="bg-gray-100 rounded-lg p-2 px-4 flex gap-1">

                            <div
                                className="grow hover:underline cursor-pointer"
                            >{category.name}</div>

                            <div className="flex gap-1">

                                <button
                                    type="button"
                                    onClick={() => {
                                    setEditedCategory(category);
                                    setCategoryName(category.name);
                                }}>Edit</button>


                                   <DeleteButton label="Delete" onDelete={() => handleDeleteClick(category._id)} /> 

                            </div>

                        </div>
                    )
                })}
            </div>

        </section>
    )
}
