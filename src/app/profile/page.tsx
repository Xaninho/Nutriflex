'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfoBox from '@/components/layout/InfoBox';
import SuccessBox from '@/components/layout/SuccessBox';
import toast from 'react-hot-toast';

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

            toast('Uploading...');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                const link = await response.json();
                setImage(link);
                toast.success('Upload complete!');
            } else {
                toast.error('Upload error!');
            }
           
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
                    <SuccessBox>
                        Profile Saved!
                    </SuccessBox>
                )}
                {isSaving && (
                    <InfoBox>
                        Saving...
                    </InfoBox>
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