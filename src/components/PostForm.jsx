import { useState, useRef } from "react";
import "./PostForm.css";
import { Send, ImagePlus, Star, MapPin, X } from "lucide-react";

function PostForm({ currentUser, onClose, onPostCreated }) {
  const [place, setPlace] = useState("");
  const [zone, setZone] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(5);
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  
  const fileInputRef = useRef(null);

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    // Simula la creación de URLs para mostrar una vista previa de las fotos
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages].slice(0, 6)); // Límite de 6 fotos según el diseño
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (place.trim() === "" || description.trim() === "") {
      setError("El lugar y la historia son obligatorios.");
      return;
    }

    const newPostData = {
      id: Date.now(), 
      user: currentUser.user,
      username: currentUser.username,
      userProfilePicture: currentUser.userProfilePicture,
      place: place.trim(),
      zone: zone.trim() || "Medellín",
      description: description.trim(),
      images: images, 
      score: Number(score),
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      likes: 0, 
      comments: 0, 
      date: new Date().toISOString() 
    };

    onPostCreated(newPostData);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>¿Cómo estuvo el parche?</h2>
          <button className="close-btn" type="button" onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="user-info">
            <div className="avatar-form">{currentUser.user.charAt(0)}</div>
            <div className="user-details">
              <span className="username-form">{currentUser.user}</span>
              <span className="user-location">Publicando para todo Medellín</span>
            </div>
          </div>

          <div className="row-group">
            <div className="input-wrapper with-icon">
              <MapPin size={20} className="input-icon" />
              <input type="text" placeholder="Etiqueta el lugar..." value={place} onChange={(e) => setPlace(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="Zona (Ej. Centro)" value={zone} onChange={(e) => setZone(e.target.value)} />
            </div>
          </div>

          <div className="input-group">
            <label>CUENTA LA HISTORIA</label>
            <textarea 
              placeholder="¿Qué pasó? ¿Con quién fuiste? ¿Qué pedirías otra vez? Los detalles hacen el plan..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              maxLength={800}
            />
            <span className="char-count">{description.length} / 800</span>
          </div>

          <div className="media-score-row">
            
            <div className="photo-upload-zone" onClick={() => fileInputRef.current.click()}>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                ref={fileInputRef} 
                style={{ display: "none" }} 
                onChange={handleImageUpload}
              />
              {images.length === 0 ? (
                <div className="upload-placeholder">
                  <ImagePlus size={32} />
                  <strong>Agrega fotos del plan</strong>
                  <span>Arrastra o elige hasta 6 fotos</span>
                </div>
              ) : (
                <div className="image-preview-container">
                  {images.map((img, index) => (
                    <img key={index} src={img} alt="Preview" className="preview-thumbnail" />
                  ))}
                </div>
              )}
            </div>

            
            <div className="score-section">
              <label>TU CALIFICACIÓN</label>
              <div className="stars-container">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <Star 
                    key={starValue}
                    size={36}
                    className={`star-icon ${starValue <= score ? 'filled' : ''}`}
                    onClick={() => setScore(starValue)}
                  />
                ))}
              </div>
              <span className="score-hint">Toca para calificar</span>
            </div>
          </div>

          <div className="input-group">
            <label>ETIQUETAS</label>
            <input type="text" placeholder="Ej: Amigos, Nocturno, Barato" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <div className="form-footer">
            <span className="community-note">✓ Tu reseña ayuda a la comunidad</span>
            <button type="submit" className="submit-btn">
              Publicar historia 
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;