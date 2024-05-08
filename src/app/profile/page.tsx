'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProfilePage() {

    const session = useSession();
    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [image, setImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session?.data?.user?.name);
            setImage(session?.data?.user?.image);
        }
    }, [session, status]);

    async function handleFileChange(ev : any) {
        const files = ev.target.files;

        if (files?.length > 0) {

            const data = new FormData();
            data.set('file', files[0]);

            setIsUploading(true);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })

            const link = await response.json();
            setImage(link);
            setIsUploading(false);
        }
        
    }

    async function handleProfileInfoUpdate(ev : any) {

        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);

        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: userName})
        });

        setIsSaving(false);

        if (response.ok) {
            setSaved(true);
        }
    }

    if (status === 'loading') {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        redirect('/login');
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
                Profile saved!
            </h2>
            <div className="max-w-ws mx-auto">
                {saved && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
                        Profile Saved!
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
                        Saving...
                    </h2>
                )}
                {isUploading && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
                        Uploading...
                    </h2>
                )}
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">

                            {image && (
                                <Image className="rounded-lg w-full h-full mb-1" src={image} width={0} height={0} alt= {'avatar'}/>
                            )}

                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange} />
                                <span className="block border border-gray-300 rounded-lg p-2 text-center">Change Avatar</span>
                            </label>
                        </div>
                    </div>    
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and last Name" value={userName} onChange={ev => setUserName(ev.target.value)} />
                        <input type="email" disabled={true} value={session?.data?.user?.email} placeholder="Email" />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>

        </section>
    );
}