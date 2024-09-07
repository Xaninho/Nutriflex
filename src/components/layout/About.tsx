import SectionHeaders from "./SectionHeaders";

export default function AboutMenu() {
    return (
        <section className="m-auto my-24 pb-16 bg-[#fbf8f1] px-6 sm:px-10">
  <section className="max-w-6xl mx-auto">
    <div className="text-center mb-4">
      <SectionHeaders
        subHeader={'The process'}
        mainHeader={'How Does It Work?'}
      />
    </div>

    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex flex-col flex-1 gap-2">
        <img src="images/step_1.png" alt="step 1" className="w-full h-48 rounded-xl" />
        <h4 className="font-semibold text-xl sm:text-2xl my-3 leading-7">Step 1: You Order</h4>
        <p>Choose your meal plan according to your dietary goal & requirements</p>
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <img src="images/step_2.png" alt="step 2" className="w-full h-48 rounded-xl" />
        <h4 className="font-semibold text-xl sm:text-2xl my-3 leading-7">Step 2: We Cook</h4>
        <p>Our chefs prepare your meals using fresh ingredients</p>
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <img src="images/step_3.png" alt="step 3" className="w-full h-48 rounded-xl" />
        <h4 className="font-semibold text-xl sm:text-2xl my-3 leading-7">Step 3: We Deliver</h4>
        <p>Your meals are delivered to your doorsteps</p>
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <img src="images/step_4.png" alt="step 4" className="w-full h-48 rounded-xl" />
        <h4 className="font-semibold text-xl sm:text-2xl my-3 leading-7">Step 4: You Enjoy</h4>
        <p>Heat & enjoy your meals. No cooking, no cleaning!</p>
      </div>
    </div>

    <div className="flex justify-center pt-16">
      <button className="w-[250px] bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
        after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]">
        <span>View Our Menu</span>
      </button>
    </div>
  </section>
</section>

    );
}