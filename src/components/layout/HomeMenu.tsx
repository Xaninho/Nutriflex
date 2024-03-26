import Image from 'next/image';
import MenuItem from '../menu/MenuItem';

export default function HomeMenu() {
    return (
        <section className="text-center mb-4">            
            <div>
                <h3 className="uppercase text-gray-600 leading-4">Check out</h3>
                <h2 className="text-primary font-bold text-4xl italic">Menu</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}