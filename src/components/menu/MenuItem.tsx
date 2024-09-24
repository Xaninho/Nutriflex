import {CartContext} from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import {useContext, useState} from "react";
// @ts-ignore
import FlyingButton from "react-flying-item";
import toast from "react-hot-toast";

export default function MenuItem(menuItem : any) {

  const { image,name,description,basePrice, sizes, extraIngredientPrices} = menuItem;
  const [ selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext) ?? {};

  async function handleAddToCartButtonClick() {

    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    if (addToCart) {
      addToCart(menuItem, selectedSize, selectedExtras);
    }

    toast.success('Product added to cart');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowPopup(false);
  }

  function handleExtraThingClick(_event : any, extraThing : any) {
    const checked = _event.target.checked;
    if (checked) {
      setSelectedExtras(previous => [...previous, extraThing]);
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>

      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 ">
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-transparent rounded-xl max-w-md shadow-slate-200 h-fit transition-all duration-500 sm:p-4">
            <div
              className=" overflow-y-scroll rounded-xl text-center h-fit group bg-white transition-all duration-500 overflow-y-hidden sm:overflow-y-auto"
            >
              <div className="text-center">
                <Image
                  src={image}
                  alt={name}
                  width={300}
                  height={200}
                  className="w-full h-full rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2 px-12 py-3 text-left">
                <h4 className="font-semibold text-2xl my-3 leading-7">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {description}
                </p>
                {sizes?.length > 0 && (
                  <div className="py-2">
                    <h3 className="text-left text-gray-700">Pick your size</h3>
                    {sizes.map((size) => (
                      <label
                        key={size._id}
                        className="flex items-center gap-2 p-4 border rounded-md mb-1">
                        <input
                          type="radio"
                          onChange={() => setSelectedSize(size)}
                          checked={selectedSize?.name === size.name}
                          name="size"
                        />
                        {size.name} €{basePrice + size.price}
                      </label>
                    ))}
                  </div>
                )}
                {extraIngredientPrices?.length > 0 && (
                  <div className="py-2">
                    <h3 className="text-left text-gray-700">Any extras?</h3>
                    {extraIngredientPrices.map((extraThing) => (
                      <label
                        key={extraThing._id}
                        className="flex items-center gap-2 p-4 border rounded-md mb-1">
                        <input
                          type="checkbox"
                          onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                          checked={selectedExtras.map((e) => e._id).includes(extraThing._id)}
                          name={extraThing.name}
                        />
                        {extraThing.name} +€{extraThing.price}
                      </label>
                    ))}
                  </div>
                )}      
                <div className="flex justify-center gap-4 text-xs sm:text-sm items-center">
                
                <button
                  className="p-4 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200"
                  onClick={() => setShowPopup(false)}>
                  Cancel
                </button>  

                <button
                  type="button"
                  onClick={handleAddToCartButtonClick}  
                  className="w-[250px] bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
                  after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]"
                >
                  <span>Add to cart €{selectedPrice}</span>
                </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...menuItem} />

    </>
  );
}