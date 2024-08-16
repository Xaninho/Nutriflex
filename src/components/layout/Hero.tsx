import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
    return (

    
       // div with relative position
        <div className="relative h-[600px] md:h-[600px] lg:h-[600px] xl:h-[600px] 2xl:h-[600px] bg-[url('/images/banner.png')] flex bg-cover px-20">

            <div className="flex flex-col justify-center content-center text-white gap-3">
                <h1 className="text-7xl font-semibold leading-15">
                    Everything <br/> is better with<br/>
                    a
                    <span className="text-primary"> Meal</span>
                </h1>
                <p className="text-lg mt-2">Clean-eating. Time-saving. Chef-prepared deliciousness.</p>
                <div className="flex gap-4 text-sm">
                    <button className="w-[250px] bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
 after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]">
                        Order now
                        <Right />
                    </button>
                </div>
            </div>
        
            
          
        </div>
    
    );
}