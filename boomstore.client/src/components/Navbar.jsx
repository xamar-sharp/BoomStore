// Navbar.jsx

import {
    Link,
    useNavigate
} from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()

    const user =
        JSON.parse(
            localStorage.getItem('user')
        )

    const logout = () => {

        localStorage.clear()

        navigate('/login')
    }

    return (

        <nav className="navbar">

            <Link to="/">
                Главная
            </Link>


            {
                user && (
                    <>
                        <Link to="/catalog">
                            Каталог
                        </Link>
                        <Link to="/cart">
                            Корзина
                        </Link>
                        <Link to="/profile">
                            Профиль
                        </Link>
                    </>
                )
            }

            {
                user?.role === 'Admin' && (
                    <Link to="/admin">
                        Админка
                    </Link>
                )
            }
            {
                user?.role === 'Admin' && (
                    <Link to="/orders">
                        Заказы
                    </Link>
                )
            }

            {
                user && (
                    <button
                        className="btn"
                        onClick={logout}
                    >
                        Выйти
                    </button>
                )
            }

        </nav>
    )
}

export default Navbar