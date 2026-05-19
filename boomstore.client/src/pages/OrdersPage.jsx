// OrdersPage.jsx

import {
    useEffect,
    useState
} from 'react'

import api from '../api/api'

function OrdersPage() {

    const [orders, setOrders] =
        useState([])

    useEffect(() => {

        loadOrders()

    }, [])

    const loadOrders = async () => {

        try {

            const token =
                localStorage.getItem('token')

            const response =
                await api.get(
                    '/orders',
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                )

            setOrders(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    const deleteOrder = async (id) => {

        try {

            const token =
                localStorage.getItem('token')

            await api.delete(
                `/orders/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setOrders(
                orders.filter(x =>
                    x.id !== id
                )
            )

        } catch (error) {

            console.log(error)

            alert(
                'Ошибка удаления'
            )
        }
    }

    return (

        <div className="page">

            <h1>
                Заказы
            </h1>

            {
                orders.length === 0
                    ? (
                        <h2>
                            Заказов нет
                        </h2>
                    )
                    : (
                        orders.map(order => (

                            <div
                                key={order.id}
                                className="product-card"
                                style={{
                                    marginBottom: '25px',
                                    padding: '20px'
                                }}
                            >

                                <h2>
                                    Заказ #{order.id}
                                </h2>

                                <p>
                                    Пользователь:
                                    {' '}
                                    {
                                        order.user?.name
                                    }
                                </p>

                                <p>
                                    Сумма:
                                    {' '}
                                    {order.total} ₽
                                </p>

                                <h3
                                    style={{
                                        marginTop: '20px'
                                    }}
                                >
                                    Товары:
                                </h3>

                                {
                                    order.items.map(item => (

                                        <div
                                            key={item.id}
                                            style={{
                                                marginTop: '15px',
                                                padding: '15px',
                                                background:
                                                    'rgba(255,255,255,.05)',
                                                borderRadius: '10px'
                                            }}
                                        >

                                            <p>
                                                {
                                                    item.product?.name
                                                }
                                            </p>

                                            <p>
                                                Количество:
                                                {' '}
                                                {
                                                    item.quantity
                                                }
                                            </p>

                                        </div>
                                    ))
                                }

                                <button
                                    className="btn"
                                    style={{
                                        marginTop: '25px'
                                    }}
                                    onClick={() =>
                                        deleteOrder(
                                            order.id
                                        )
                                    }
                                >
                                    Удалить заказ
                                </button>

                            </div>
                        ))
                    )
            }

        </div>
    )
}

export default OrdersPage