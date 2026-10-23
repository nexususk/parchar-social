import { useState } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

function Carousel({ images, place, zone, score }) {
  const [indice, setIndice] = useState(0);

  function anterior() {
    if (indice === 0) {
      setIndice(images.length - 1);
    } else {
      setIndice(indice - 1);
    }
  }

  function siguiente() {
    if (indice === images.length - 1) {
      setIndice(0);
    } else {
      setIndice(indice + 1);
    }
  }

  return (
    <div className="carousel">
      <img className="carousel-img" src={images[indice]} alt={"Foto de " + place} />

      <div className="score-badge">
        <Star size={18} fill="currentColor" />
        <strong>{score}</strong>
        <span>/ 5</span>
      </div>

      <div className="place-badge">
        <MapPin size={18} />
        <div>
          <strong>{place}</strong>
          <span>{zone}</span>
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel-btn left" type="button" onClick={anterior} aria-label="Imagen anterior">
            <ChevronLeft size={22} />
          </button>
          <button className="carousel-btn right" type="button" onClick={siguiente} aria-label="Imagen siguiente">
            <ChevronRight size={22} />
          </button>

          <div className="carousel-dots">
            {images.map((img, i) => (
              <span key={i} className={i === indice ? "dot active" : "dot"}></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
