import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"

const root = document.getElementById('root')

const container = createRoot(root)

container.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
)