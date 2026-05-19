// LoginPage.jsx

import {
    useState
} from 'react'

import {
    Link,
    useNavigate
} from 'react-router-dom'

import api from '../api/api'

function LoginPage() {

    const navigate = useNavigate()

    const [email, setEmail] =
        useState('')

    const [password, setPassword] =
        useState('')

    const [error, setError] =
        useState('')

    const submit = async e => {

        e.preventDefault()

        try {

            const response =
                await api.post(
                    '/auth/login',
                    {
                        email,
                        password
                    }
                )

            localStorage.setItem(
                'token',
                response.data.token
            )

            localStorage.setItem(
                'user',
                JSON.stringify(
                    response.data.user
                )
            )

            navigate('/profile')

        } catch (error) {

            console.log(error)

            setError(
                'Ошибка авторизации'
            )
        }
    }

    return (

        <div className="page auth-page">

            <form
                className="auth-form"
                onSubmit={submit}
            >

                <h1>
                    Вход
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                {
                    error && (

                        <p className="error">

                            {error}

                        </p>
                    )
                }

                <button
                    className="btn"
                    type="submit"
                >

                    Войти

                </button>

                <p className="auth-link">

                    Нет аккаунта?

                    <Link to="/register">

                        Зарегистрироваться

                    </Link>

                </p>

            </form>

        </div>
    )
}

export default LoginPage