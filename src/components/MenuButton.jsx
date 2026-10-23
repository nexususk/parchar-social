import { MoreHorizontal } from 'lucide-react';

function MenuButton() {
  return (
    <button className="menu-btn" type="button" aria-label="Más opciones">
      <MoreHorizontal size={22} />
    </button>
  );
}

export default MenuButton;
