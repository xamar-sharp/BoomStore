

import {
    Link
} from 'react-router-dom'

function HomePage() {

    return (

        <div className="hero">

            <div className="hero-content">

                <h1>
                    BOOM
                </h1>

                <p>
                    Онлайн магазин электроники
                    с доставкой на дом
                </p>

                <div className="hero-buttons">

                    <Link
                        to="/catalog"
                        className="btn"
                    >

                        Каталог

                    </Link>

                    <Link
                        to="/login"
                        className="btn"
                    >

                        Войти

                    </Link>

                    <Link
                        to="/register"
                        className="btn secondary"
                    >

                        Регистрация

                    </Link>

                </div>

            </div>

        </div>
    )
}

export default HomePage