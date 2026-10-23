import './App.css'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import PanelMapa from './components/PanelMapa'
import PostList from './components/PostList'

function App() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarPosts() {
      try {
        const response = await fetch("/Posts.json");
        if (!response.ok) throw new Error("No se encontró Posts.json");
        setPosts(await response.json());
      } catch (error) {
        setError("Error al cargar las publicaciones: " + error.message);
      } finally {
        setCargando(false);
      }
    }
    cargarPosts();
  }, []);

  return (
    <main>
      <h1>Parchar Social</h1>
      <div className="contenido">
        <aside className="columna-izquierda">
          <PanelMapa />
        </aside>

        <section className="columna-centro">
          {cargando && <p>Cargando publicaciones...</p>}
          {error !== "" && <p id="error">{error}</p>}
          {!cargando && error === "" && posts.length === 0 && <p>No hay publicaciones disponibles</p>}
          {!cargando && error === "" && <PostList posts={posts} />}
        </section>

        <aside className="columna-derecha"></aside>
      </div>

      <Navbar />
    </main>
  )
}

export default App
