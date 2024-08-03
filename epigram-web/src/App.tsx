import logo from './assets/fountain-pen.png'

import './App.css'
import {EpigramLoader} from "./EpigramLoader.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {

// Create a client
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <>
                <div>
                    <img src={logo} className="logo" alt="Vite logo"/>
                </div>
                <h1>Epigrams</h1>
                <EpigramLoader/>

                <p className="read-the-docs">
                    A simple webversion of the 'fortune' command
                </p>
            </>
        </QueryClientProvider>
    )
}

export default App
