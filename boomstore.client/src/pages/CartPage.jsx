import {
    useContext
} from 'react'

import api from '../api/api'

import {
    CartContext
} from '../context/CartContext'

function CartPage() {

    const {
        cart,
        removeFromCart,
        clearCart
    } = useContext(CartContext)

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price,
            0
        )

    const checkout = async () => {

        try {

            const token =
                localStorage.getItem('token')

            const items = cart.map(x => ({
                productId: x.id,
                quantity: 1
            }))

            await api.post(
                '/orders',
                items,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            alert('Заказ оформлен')

            clearCart()

        } catch (error) {

            console.log(error)

            alert('Ошибка оформления')
        }
    }

    return (

        <div className="page">

            <h1>
                Корзина
            </h1>

            {
                cart.length === 0
                    ? (
                        <h2>
                            Корзина пуста
                        </h2>
                    )
                    : (
                        <>
                            {
                                cart.map(item => (

                                    <div
                                        key={item.id}
                                        className="cart-item"
                                    >

                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                        />

                                        <div>

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <p>
                                                {item.price} ₽
                                            </p>

                                            <button
                                                className="btn"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.id
                                                    )
                                                }
                                            >
                                                Удалить
                                            </button>

                                        </div>

                                    </div>
                                ))
                            }

                            <h2 className="cart-total">
                                Итого: {total} ₽
                            </h2>

                            <button
                                className="btn"
                                onClick={checkout}
                            >
                                Оформить заказ
                            </button>
                        </>
                    )
            }

        </div>
    )
}

export default CartPage