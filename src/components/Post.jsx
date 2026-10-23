import './Post.css';
import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, MapPin } from 'lucide-react';
import MenuButton from './MenuButton';
import Carousel from './Carousel';

function tiempoTranscurrido(fecha) {
  const minutos = Math.floor((Date.now() - new Date(fecha)) / 60000);

  if (minutos < 1) return "ahora";
  if (minutos < 60) return minutos + " min";

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return horas + " h";

  const dias = Math.floor(horas / 24);
  return dias + (dias === 1 ? " día" : " días");
}

function iniciales(nombre) {
  return nombre.replace(".", "").split(" ").map((p) => p[0]).join("").toUpperCase();
}

function Post({ post }) {
  const [meGusta, setMeGusta] = useState(false);
  const [guardado, setGuardado] = useState(false);

  return (
    <article className="post">
      <header className="post-header">
        {post.userProfilePicture !== "" ? (
          <img className="avatar" src={post.userProfilePicture} alt={post.user} />
        ) : (
          <div className="avatar">{iniciales(post.user)}</div>
        )}

        <div className="post-info">
          <p className="post-user">
            <strong>{post.user}</strong>
            <span>{post.username} · {tiempoTranscurrido(post.date)}</span>
          </p>
          <p className="post-recomienda">
            recomienda <strong>{post.place}</strong>
          </p>
        </div>

        <MenuButton />
      </header>

      <p className="post-description">{post.description}</p>

      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <Carousel
        images={post.images}
        place={post.place}
        zone={post.zone}
        score={post.score}
      />

      <footer className="post-footer">
        <button
          className={meGusta ? "action liked" : "action"}
          type="button"
          onClick={() => setMeGusta(!meGusta)}
        >
          <Heart size={24} fill={meGusta ? "currentColor" : "none"} />
          {post.likes + (meGusta ? 1 : 0)}
        </button>

        <button className="action" type="button">
          <MessageCircle size={22} />
          {post.comments}
        </button>

        <button
          className={guardado ? "action saved" : "action"}
          type="button"
          onClick={() => setGuardado(!guardado)}
        >
          <Bookmark size={22} fill={guardado ? "currentColor" : "none"} />
          Guardar plan
        </button>

        <button className="map-btn" type="button">
          <MapPin size={18} />
          Ver en mapa
        </button>
      </footer>
    </article>
  );
}

export default Post;
