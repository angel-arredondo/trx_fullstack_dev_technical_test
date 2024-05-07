
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import VehicleProvider from './vehicle/presentation/context/vehicle.context.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <VehicleProvider>
        <App /> 
    </VehicleProvider>
)
