
import ReactDOM from 'react-dom/client'
import App from './presentation/App.tsx'
import './index.css'
import VehicleProvider from './presentation/vehicles/context/vehicle.context.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <VehicleProvider>
        <App /> 
    </VehicleProvider>
)
