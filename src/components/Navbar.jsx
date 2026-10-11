import './Navbar.css';
import { Home, Search, PlusSquare, User, MapPinned } from 'lucide-react';

const items = [
  { icon: Home, label: 'Inicio', active: true },
  { icon: Search, label: 'Buscar' },
  { icon: PlusSquare, label: 'Crear' },
  { icon: MapPinned, label: 'Notificaciones' },
  { icon: User, label: 'Perfil' },
];

function Navbar() {
  return (
    <nav className="instagram-nav" aria-label="Navegación principal">
      {items.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`nav-item ${active ? 'active' : ''}`}
          type="button"
          aria-label={label}
        >
          <Icon size={24} />
        </button>
      ))}
    </nav>
  );
}

export default Navbar;