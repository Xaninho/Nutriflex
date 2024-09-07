
'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import useProfile from "@/components/useProfile";
import {useState} from "react";

export default function UserForm({user,onSave} : any) {

  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const {data:loggedInUserData} = useProfile();

  function handleAddressChange(propName : string, value : any) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name:userName, image, phone, admin,
            streetAddress, city, country, postalCode,
          })
        }
      >
        <label>
          First and last name
        </label>
        <input
          type="text" placeholder="First and last name"
          value={userName} onChange={ev => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email}
          placeholder={'email'}
        />
        <AddressInputs
          addressProps={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData?.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className="" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button
          className="w-full sm:w-[220px] md:w-[250px] bg-primary h-[40px] sm:h-[45px] md:h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]"
          
        type="submit">Save</button>
      </form>
    </div>
  );
}