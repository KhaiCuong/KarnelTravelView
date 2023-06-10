import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

const CartProviderProps = {
  children: ReactNode
}

const CartItem = {
  id: number,
  quantity: number
}

function ShoppingCartContext(openCart, closeCart,getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart,cartQuantity,cartItems) 
 {
  this.openCart = function() { },
  this.closeCart = function() { },
  this.getItemQuantity = function() { },
  this.increaseCartQuantity = function() { },
  this.decreaseCartQuantity= function() { },
  this.removeFromCart = function() { },
  this.cartQuantity = number,
  this.cartItems  = []
}

const  ShoppingCartContext = createContext(ShoppingCartContext);

function ShoppingCartProvider({children}) {

    const [itemCart, setItemCart] = useState("");
    const valueProvide = {
        itemCart,
        setItemCart

    }
    return <ShoppingCartContext.Provider value={valueProvide}>
        {children}
    </ShoppingCartContext.Provider>

}

export default ShoppingCartProvider;