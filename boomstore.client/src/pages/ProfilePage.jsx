function ProfilePage() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        return (
            <div className="page">
                <h1>Пользователь не авторизован</h1>
            </div>
        )
    }

    return (
        <div className="page">
            <h1>Профиль</h1>

            <div className="card">
                <h3>Имя:</h3>
                <p>{user.name}</p>
            </div>

            <div className="card">
                <h3>Email:</h3>
                <p>{user.email}</p>
            </div>

            <div className="card">
                <h3>JWT Token:</h3>
                <textarea
                    rows="6"
                    value={localStorage.getItem('token') || ''}
                    readOnly
                />
            </div>
        </div>
    )
}

export default ProfilePage