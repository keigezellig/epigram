import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {EpigramComponent} from "./ShowEpigram.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {

// Create a client
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <>
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <h1>Epigrams</h1>
                <EpigramComponent/>
                <p className="read-the-docs">
                    A simple webversion of the 'fortune' command
                </p>
            </>
        </QueryClientProvider>
    )
}

export default App
