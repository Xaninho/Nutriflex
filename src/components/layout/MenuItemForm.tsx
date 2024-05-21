import Link from "next/link";
import Left from "../icons/Left";
import Tabs from "./Tabs";
import EditableImage from "./EditableImage";

export default function MenuItemForm() {

    return (
        <section className="mt-8">
            <Tabs isAdmin={true} />
            <div>
                <Left />
                <Link href="/menu-items">
                    <a className="button">
                        <span>Show all menu items</span>
                    </a>
                </Link>
            </div>
            <form className="mt-8 max-w-md max-auto" onSubmit={handleFormSubmit}>
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
                        <button type="submit">Save</button>
                    </div>
                    
                </div>

            </form>

        </section>
    )

}