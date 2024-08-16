import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({onAddToCart, ...item}: any) {
  const {image, description, name, basePrice,
    sizes, extraIngredientPrices,
  } = item;
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="pb-6 rounded-lg shadow-2xl shadow-slate-200 text-center h-fit group hover:bg-white hover:drop-shadow-2xl hover:drop-shadow-2xl transition-all duration-500">
      <div className="text-center ">
        <img src={image} className="w-full h-full rounded-lg" alt="pizza"/>
      </div>
      <div className="flex flex-col gap-2 px-12 py-3 text-left">
          <h4 className="font-semibold text-2xl my-3 leading-7">{name}</h4>
          <p className="text-gray-500 text-sm line-clamp-3">
            {description}
          </p>

          {
            /*

            <h3 className="font-semibold text-xl my-3 leading-7">
              ${basePrice} USD
            </h3>

            */

          }
          
          <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
      </div>
      
    </div>
  );
}