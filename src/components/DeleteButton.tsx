import {useState} from "react";

export default function DeleteButton({ label ,onDelete } : any) {

  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/60 inset-0 flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
    <div className="w-full flex justify-between	- items-center mb-4">
      <h2 className="text-lg font-bold">Confirmation</h2>
      <button
        onClick={() => setShowConfirm(false)}
        className="w-auto text-gray-500 hover:text-gray-700 text-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div className="flex items-center gap-2 mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6 text-yellow-500">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M12 17a4 4 0 110-8 4 4 0 010 8zm0 0h.01" />
      </svg>
      <p>Are you sure you want to delete?</p>
    </div>

    <div className="flex justify-end gap-4">
      <button
        onClick={() => setShowConfirm(false)}
        className=" w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 text-center rounded-lg">
        Cancel
      </button>
      <button
        onClick={() => {
          onDelete();
          setShowConfirm(false);
        }}
        className="w-auto bg-[#f13a01] hover:bg-[#9e2905] text-white text-center font-medium py-2 px-4 rounded-lg">
        Continue
      </button>
    </div>
  </div>
</div>

    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}