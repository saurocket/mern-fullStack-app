import 'materialize-css'
import {useRoutes} from "./routs";
import {BrowserRouter} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./contecst/AuthContext";
import {NavBar} from "./components/NavBar";
import {Loader} from "./components/Loader";


function App() {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth);
    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth
        }}>
            <BrowserRouter>
                {isAuth && <NavBar/>}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
