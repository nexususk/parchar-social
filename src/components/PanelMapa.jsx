import './PanelMapa.css';
import GoogleMapSection from './Mapa';
import BotonExplorar from './BotonExplorar';

function PanelMapa() {
  return (
    <div className="panel-mapa">
      <h2>Estás en Medellín</h2>
      <p>Hay planes cerca tuyo</p>

      <GoogleMapSection />

      <BotonExplorar />
    </div>
  );
}

export default PanelMapa;
