import Link from "next/link";
import Left from "../icons/Left";
import Tabs from "./Tabs";
import EditableImage from "./EditableImage";
import { useState } from "react";
import MenuItemPriceProps from "./menuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}) {

    const [name, setName] = useState(menuItem?.image !! '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [image, setImage] = useState(menuItem?.image || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

  
    return (
        <form className="mt-8 max-w-md max-auto" onSubmit={ev => onSubmit(ev, {image, name, description, basePrice, sizes, extraIngredientPrices})}>
                <div className="flex items-end gap-2">
                    <div className="max-w-[200px]">
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label> Item Name </label>
                        <input
                            value={name}
                            onChange={ev => setName(ev.target.value)} 
                            type="text" />
                        <label> Item Description </label>
                        <input
                            value={description}
                            onChange={ev => setDescription(ev.target.value)} 
                            type="text" />
                        <label> Base Price </label>
                        <input
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)} 
                            type="text" />

                        <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes} />
                        <MenuItemPriceProps name={'Extra Ingredients'} addLabel={'Add ingredients prices'} props={extraIngredientPrices} setProps={setExtraIngredientPrices} />
                        
                        <button type="submit">Save</button>
                    </div>
                    
                </div>

        </form>
    )

}