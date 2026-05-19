import {
    Link
} from 'react-router-dom'

import {
    useContext,
    useEffect,
    useState
} from 'react'

import api from '../api/api'

import {
    CartContext
} from '../context/CartContext'

function CatalogPage() {

    const [products, setProducts] =
        useState([])

    const { addToCart } =
        useContext(CartContext)

    useEffect(() => {

        loadProducts()

    }, [])

    const loadProducts = async () => {

        try {

            const response =
                await api.get('/products')

            setProducts(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div className="page">

            <h1>
                Каталог товаров
            </h1>

            <div className="products-grid">

                {
                    products.map(product => (

                        <div
                            key={product.id}
                            className="product-card"
                        >

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                            />

                            <h2>
                                {product.name}
                            </h2>

                            <p className="desc">
                                {product.description}
                            </p>

                            <p className="price">
                                {product.price} ₽
                            </p>

                            <div className="actions">

                                <Link
                                    to={`/product/${product.id}`}
                                    className="btn"
                                >

                                    Подробнее

                                </Link>
                                <button
                                    className="btn"
                                    onClick={() =>
                                        addToCart(product)
                                    }
                                >

                                    В корзину

                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default CatalogPage