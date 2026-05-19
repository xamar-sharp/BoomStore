import {
    createContext,
    useState
} from 'react'

export const CartContext =
    createContext()

export function CartProvider({
    children
}) {

    const [cart, setCart] =
        useState([])

    const addToCart = product => {

        setCart(prev => [

            ...prev,

            product
        ])
    }

    const removeFromCart = id => {

        setCart(prev =>
            prev.filter(
                x => x.id !== id
            )
        )
    }

    const clearCart = () => {

        setCart([])
    }

    return (

        <CartContext.Provider
            value={{

                cart,

                addToCart,

                removeFromCart,

                clearCart
            }}
        >

            {children}

        </CartContext.Provider>
    )
}