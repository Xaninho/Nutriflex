import { useState } from "react";

export default function MenuItemPriceProps({name, addLabel, props, setProps}) {

    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name: '', price: ''}];
        })
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(oldProps => {
            const newProps = [...oldProps];
            newProps[index][prop] = newValue;
            return newProps;
        })
    }

    function removeProp(index : number) {    
        setProps(prev => prev.filter((v,i) => i === index));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <div className="flex gap-1">
                <div>
                    <button
                        className="inline-flex shrink"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        >
                        {isOpen ? '🔽' : '🔼'}
                    </button>
                </div>
                <h3 className="grow text-gray-700">{name}</h3>
                <span>{props?.length}</span>
            </div>
            <div>
                    {props?.length > 0 && props.map((size, index) => (
                    
                    <div className="flex gap-2">
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Size name" value={size.name} onChange={ev => editProp(ev,index, 'price')} />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text" placeholder="Extra price" value={size.price} />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white mb-2">Remove</button>
                        </div>
                    </div>

                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white">{addLabel}</button>
            </div>
    </div>
    );
}