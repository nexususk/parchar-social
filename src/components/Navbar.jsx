import './Navbar.css';
import { Home, Search, Plus, User, MapPinned } from 'lucide-react';

const items = [
  { icon: Home, label: 'Inicio', active: true },
  { icon: MapPinned, label: 'Mapa' },
  { icon: Search, label: 'Buscar' },
  { icon: User, label: 'Perfil' },
];

function Navbar({ onOpenForm }) {
  return (
    <nav className="bottom-navbar" aria-label="Navegación principal">
      <div className="brand" aria-label="Marca">
        <div className="brand-mark">P</div>
        <span className="brand-name">Parchar <span className="brand-name-highlight">Social</span></span>
      </div>

      <div className="nav-items">
        {items.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`nav-item ${active ? 'active' : ''}`}
            type="button"
            aria-label={label}
          >
            <Icon size={24} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <button className="new-post-btn" type="button" onClick={onOpenForm}>
        <Plus size={18} />
        Nuevo post
      </button>
    </nav>
  );
}
export default Navbar;