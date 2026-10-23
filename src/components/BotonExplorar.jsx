import './BotonExplorar.css';
import { MapPinned } from 'lucide-react';

// Botón "Explorar el mapa". Por ahora no hace nada.
function BotonExplorar() {
  return (
    <button className="boton-explorar" type="button">
      <MapPinned size={20} />
      Explorar el mapa
    </button>
  );
}

export default BotonExplorar;
