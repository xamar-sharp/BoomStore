import {
    useEffect,
    useState
} from 'react'

import api from '../api/api'

function AdminPage() {

    const [products, setProducts] = useState([])

    const [form, setForm] = useState({

        name: '',

        description: '',

        price: '',

        imageUrl: '',

        categoryId: 1
    })

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

    const createProduct = async e => {

        e.preventDefault()

        try {

            const response =
                await api.post('/products', {

                    name: form.name,

                    description: form.description,

                    price: Number(form.price),

                    imageUrl: form.imageUrl,

                    categoryId: Number(form.categoryId)
                })

            setProducts(prev => [

                ...prev,

                response.data
            ])

            setForm({

                name: '',

                description: '',

                price: '',

                imageUrl: '',

                categoryId: 1
            })

        } catch (error) {

            console.log(
                error.response?.data
            )
        }
    }

    const deleteProduct = async id => {

        try {

            await api.delete(
                `/products/${id}`
            )

            setProducts(prev =>
                prev.filter(
                    x => x.id !== id
                )
            )

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div className="page">

            <h1>
                Админ панель
            </h1>

            <form onSubmit={createProduct}>

                <input
                    type="text"
                    placeholder="Название"
                    value={form.name}
                    onChange={e =>
                        setForm({

                            ...form,

                            name: e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Описание"
                    value={form.description}
                    onChange={e =>
                        setForm({

                            ...form,

                            description:
                                e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Цена"
                    value={form.price}
                    onChange={e =>
                        setForm({

                            ...form,

                            price:
                                e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="URL картинки"
                    value={form.imageUrl}
                    onChange={e =>
                        setForm({

                            ...form,

                            imageUrl:
                                e.target.value
                        })
                    }
                />

                <select
                    value={form.categoryId}
                    onChange={e =>
                        setForm({

                            ...form,

                            categoryId:
                                e.target.value
                        })
                    }
                >

                    <option value={1}>
                        Смартфоны
                    </option>

                    <option value={2}>
                        Ноутбуки
                    </option>

                    <option value={3}>
                        Наушники
                    </option>

                </select>

                <button type="submit">

                    Создать товар

                </button>

            </form>

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

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                {product.price} ₽
                            </p>

                            <button
                                onClick={() =>
                                    deleteProduct(
                                        product.id
                                    )
                                }
                            >

                                Удалить

                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default AdminPage