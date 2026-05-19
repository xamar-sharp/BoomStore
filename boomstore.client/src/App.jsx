

import {
    Routes,
    Route
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import OrdersPage from './pages/OrdersPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

    const user =
        JSON.parse(
            localStorage.getItem('user')
        )

    return (

        <>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/catalog"
                    element={<ProtectedRoute><CatalogPage /></ProtectedRoute>}
                />

                <Route
                    path="/product/:id"
                            element={<ProtectedRoute><ProductPage /></ProtectedRoute>}
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

            </Routes>

        </>
    )
}

export default App