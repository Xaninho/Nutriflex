// types.d.ts
declare namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }

  // (product : any, size = null, extras=[])

  interface CartContextType {
    cartProducts: any[]; // Adjust the type as needed
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>; // Adjust the type as needed
    addToCart: (product: any, size: any, extras: any ) => void; // Adjust the parameter type as needed
    removeCartProduct: (productId: number) => void; // Adjust the parameter type as needed
    clearCart: () => void;
  }