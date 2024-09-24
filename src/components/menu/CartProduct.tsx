
import {cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({product,onRemove} : {product: any, onRemove?: any}) {
  return (
    <div className="pb-2 rounded-lg shadow-2xl max-w-[400px] shadow-slate-200 text-center h-fit transition-all duration-500">
  <div className="text-center mx-auto">
    <Image width={500} height={500} src={product.image} alt={product.name} className="w-full h-full rounded-lg" />
  </div>
  <div className="flex flex-col gap-2 px-6 py-3 text-left">
    <h4 className="font-semibold text-xl my-3 leading-7">{product.name}</h4>
    {product.size && (
      <div className="text-sm text-gray-600">
        Size: <span>{product.size.name}</span>
      </div>
    )}
    {product.extras?.length > 0 && (
      <div className="text-sm text-gray-500 mt-1">
        {product.extras.map((extra) => (
          <div key={extra.name}>{extra.name} €{extra.price}</div>
        ))}
      </div>
    )}
    {product.extras?.length === 0 && (
      <div className="text-sm text-gray-600">
        Quantity: <span>1</span>
      </div>
    )}
    <div className="flex 
      justify-between items-center
      text-lg font-semibold text-primary mt-2">
      €{cartProductPrice(product)}
      {!!onRemove && (
      <div>
        <button
          type="button"
          onClick={() => onRemove(product)}
          className="text-red-600 hover:text-red-800 transition-all duration-300">
          <Trash />
        </button>
      </div>
    )}
    </div>
    
  </div>
</div>


  );
}
