import {
    useEffect,
    useState,
    useContext
} from 'react'

import {
    useParams
} from 'react-router-dom'

import api from '../api/api'

import {
    CartContext
} from '../context/CartContext'

function ProductPage() {

    const { id } = useParams()

    const [product, setProduct] =
        useState(null)

    const [loading, setLoading] =
        useState(true)

    const {
        addToCart
    } = useContext(CartContext)

    useEffect(() => {

        loadProduct()

    }, [id])

    const loadProduct = async () => {

        try {

            const response =
                await api.get(
                    `/products/${id}`
                )

            setProduct(response.data)

        } catch (error) {

            console.log(error)

            setProduct(null)

        } finally {

            setLoading(false)
        }
    }

    if (loading) {

        return (

            <div className="page">

                <h2>
                    Загрузка...
                </h2>

            </div>
        )
    }

    if (!product) {

        return (

            <div className="page">

                <h2>
                    Товар не найден
                </h2>

            </div>
        )
    }

    return (

        <div className="page product-page">

            <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
            />

            <div className="product-info">

                <h1>
                    {product.name}
                </h1>

                <p className="desc">

                    {product.description}

                </p>

                <h2 className="price">

                    {product.price} ₽

                </h2>

                <button
                    className="btn"
                    onClick={() =>
                        addToCart(product)
                    }
                >

                    Добавить в корзину

                </button>

            </div>

        </div>
    )
}

export default ProductPage