import { createContext, ReactNode, useContext, useState } from "react";
import BookingModal from "../Booking/ModalBooking";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartProviderProps = {
  children: ReactNode,
};

// const CartItem = {
//   id: number,
//   quantity: number
// }

// function ShoppingCartContext(openCart, closeCart,getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart,cartQuantity,cartItems)
//  {
//   this.openCart = function() { },
//   this.closeCart = function() { },
//   this.getItemQuantity = function() { },
//   this.increaseCartQuantity = function() { },
//   this.decreaseCartQuantity= function() { },
//   this.removeFromCart = function() { },
//   this.cartQuantity = number,
//   this.cartItems  = CartItem[]
// }

const ShoppingCartContext = createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // function getItemQuantity(id) {
  //   return cartItems.find(item => item.id === id)?.quantity || 0
  // }
  // function increaseCartQuantity(id, type) {
  //   setCartItems(currItems => {
  //     if (currItems.find(item => item.id === id) == null) {
  //       return [...currItems, { id, quantity: 1 , type}]
  //     } else {
  //       return currItems.map(item => {
  //         if (item.id === id) {
  //           return { ...item, quantity: item.quantity + 1 }
  //         } else {
  //           return item
  //         }
  //       })
  //     }
  //   })
  // }
  // function decreaseCartQuantity(id) {
  //   setCartItems(currItems => {
  //     if (currItems.find(item => item.id === id)?.quantity === 1) {
  //       return currItems.filter(item => item.id !== id)
  //     } else {
  //       return currItems.map(item => {
  //         if (item.id === id) {
  //           return { ...item, quantity: item.quantity - 1 }
  //         } else {
  //           return item
  //         }
  //       })
  //     }
  //   })
  // }
  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  const [itemCart, setItemCart] = useState("");
  const valueProvide = {
    itemCart,
    setItemCart,
    openCart() {},
    closeCart() {},
    getItemQuantity() {},
    
    increaseCartQuantity(id, type, times) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id) == null) {
          return [...currItems, { id, quantity: 1, type ,times}];
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 ,times};
            } else {
              return item;
            }
          });
        }
      });
    },
    addMultiQuantity(id, qtt, type , times) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id) == null) {
          return [...currItems, { id, quantity: Number(qtt), type ,times }];
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              if(typeof item.times != "undefined" ) {
                  return { ...item, quantity: item.quantity + Number(qtt) ,times };
              } else {
                return { ...item, quantity: item.quantity + Number(qtt) ,times};
              }   
            } else {
              return item;
            }
          });
        }
      });
    },
    changeQuantity(id, qtt, type) {
      setCartItems((currItems) => {
        return currItems.map((item) => {
          if (item.id === id) {
            return   { ...item, quantity: Number(qtt) };
      
          } else {
            return item;
          }
          
        });
      });
    },
    changeDate(id, times ) {
      setCartItems((currItems) => {
        return currItems.map((item) => {
          if (item.id === id) {
            return   { ...item, times};
          } else {
            return item;
          }
        });
      });
    },
    decreaseCartQuantity(id , time) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id)?.quantity === 1) {
          return currItems.filter((item) => item.id !== id);
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
        }
      });
    },
    SetPrice(id, pri) {
      setCartItems((currItems) => {
        return currItems.map((item) => {
          if (item.id === id) {
            return   { ...item, price: Number(pri)};
          } else {
            return item;
          }
        });
      });
    },
    removeFromCart(id) {
      setCartItems((currItems) => {
        return currItems.filter((item) => item.id !== id);
      });
    },
    cartQuantity,
    cartItems,
  };
  return (
    <ShoppingCartContext.Provider value={valueProvide}>
      {children}
      <BookingModal isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
