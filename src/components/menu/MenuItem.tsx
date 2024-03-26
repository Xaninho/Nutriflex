import Image from 'next/image';

export default function MenuItem () {
    return (
        <div className="bg-gray-200 p-4 rounded-lg hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
            <Image src={'/mealprep.png'} height={'150'} width={'150'} alt={'Meal'} />
            <h4 className="font-semibold my-2 txt-xl my-3">Pepperoni Pizza</h4>
            <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="mt-4 bg-primary text-white rounded-full px-6 py-2">
                Add to cart €12.99
            </button>
        </div>
    );
}