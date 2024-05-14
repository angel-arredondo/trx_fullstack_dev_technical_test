import { Footer } from './components/footer.component';
import { Map } from './components/map.component'
import { VehicleTable } from './vehicles/components/vehicle-table.component';

function App() {

  return (
    <main>
      <Map/>
      <VehicleTable/>
      <Footer/>
    </main>
    
  );
}

export default App;
