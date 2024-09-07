import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
    return (

    
       // div with relative position
       <div className="relative h-[700px] bg-[url('/images/banner.png')] bg-cover bg-center bg-scroll sm:bg-fixed flex px-6 sm:px-10 md:px-20">
  <div className="flex flex-col justify-center content-center text-white gap-3 z-20">
    <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold leading-tight sm:leading-snug md:leading-15">
      Everything <br /> is better with<br />
      a <span className="text-primary">Meal</span>
    </h1>
    <p className="text-lg sm:text-xl md:text-2xl mt-2">
      Clean-eating. Time-saving. Chef-prepared deliciousness.
    </p>
    <div className="flex gap-4 text-xs sm:text-sm">
      <button className="w-[200px] sm:w-[220px] md:w-[250px] bg-primary h-[40px] sm:h-[45px] md:h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]">
        Order now
        <Right />
      </button>
    </div>
  </div>
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
</div>

   
    
    );
}