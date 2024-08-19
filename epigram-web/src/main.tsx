import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "react-oidc-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const oidcConfig = {
    authority: "http://localhost:8080/realms/test-realm",
    client_id: "epigram-app",
    redirect_uri: `${window.location.origin}`,
}
const onSignInCallback = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider {...oidcConfig} onSigninCallback={onSignInCallback}>
                <App/>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
