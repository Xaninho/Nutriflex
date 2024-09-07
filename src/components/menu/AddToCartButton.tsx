// @ts-ignore
import FlyingButton from 'react-flying-item'

export default function AddToCartButton({hasSizesOrExtras, onClick, basePrice, image} 
  : {hasSizesOrExtras: boolean, onClick: () => void, basePrice: number, image: string}) {

    if (!hasSizesOrExtras) {
      return (
        
          <FlyingButton
            targetTop={'5%'}
            targetLeft={'95%'}
            src={image}
            
            onClick={onClick}>
              <p
        className="w-[250px] bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
 after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]"
      >
              Add to cart ${basePrice}
              </p>
            
          </FlyingButton>
         
      );
    }
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-[250px] bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
 after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]"
      >
        <span>Add to cart (from ${basePrice})</span>
      </button>
    );
}