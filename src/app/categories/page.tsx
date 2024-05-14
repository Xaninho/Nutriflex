'use client'
import Tabs from "@/components/layout/Tabs"
import useProfile from "@/components/useProfile"

export default function CategoriesPage() {

    async function handleNewCategorySubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        const creationPromise = new Promise(async(resolve, reject) => {
            
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: newCategoryName}),
            });

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
        }
       
    }

    const [newCategoryName, setNewCategoryuName] = useState('');
    const {loading : profileLoading, data : profileData} = useProfile();

    if (profileLoading) {
        return <div>Loading...</div>
    }

    if (!profileData.admin) {
        return <div>Not authorized</div>
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <Tabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label> New Category Name </label>
                        <input type="text" value={newCategoryName} onChange={ev => setNewCategoryuName(ev.target.value)} />
                    </div>
                    <div className="pb-2">
                        <button className="border border-primary">Create</button>
                    </div>
                </div>
                <label>New category name</label>
                <input type="text" />
            </form>
        </section>
    )
}