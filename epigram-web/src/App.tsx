import logo from './assets/fountain-pen.png'

import './App.css'
import {AddEpigramComponent} from "./AddEpigram.tsx";
import {useAuth} from "react-oidc-context";
import EpigramLoader from "./EpigramLoader.tsx";

function App() {

// Create a client

    const auth = useAuth();
    if (auth.isAuthenticated) {
        console.log(auth.user?.profile);
        console.log(auth.user?.scope);

    }
    return (
        <>
            <div>
                <img src={logo} className="logo" alt="Vite logo"/>
            </div>
            <h1>Epigrams</h1>

            {auth.activeNavigator === "signinSilent" && <div>Signing you in...</div>}
            {auth.activeNavigator === "signoutRedirect" && <div>Signing you out...</div>}
            {auth.error && <div>Auth error: {auth.error.message} </div>}

            {auth.isAuthenticated && <>
                <div>Welcome {auth.user?.profile.preferred_username}</div>
                <EpigramLoader/>
                {auth.isAuthenticated && auth.user?.profile.client_roles?.includes('admin') &&
                    <AddEpigramComponent/>
                }
                <button onClick={() => auth.signoutSilent()}>Log out</button>
            </>}

            {!auth.isAuthenticated &&
                <button onClick={() => auth.signinRedirect()}>Log in</button>
            }


            <p className="read-the-docs">
                A simple webversion of the 'fortune' command
            </p>
        </>
    )

}

export default App
