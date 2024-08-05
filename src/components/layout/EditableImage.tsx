import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditableImage({link, setLink} : {link: string, setLink: (link: string) => void}) {

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
                setLink(link);
                toast.success('Upload complete!');
            } else {
                toast.error('Upload error!');
            }
           
        }
        
    }

    return (
        <>
            {link && (
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={0} height={0} alt= {'avatar'}/>
            )}
            {!link && (
                <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                    No image
                </div>
            )}

            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center">Change Avatar</span>
            </label>
        </>
    )

}