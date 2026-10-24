import './App.css'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import PanelMapa from './components/PanelMapa'
import PostList from './components/PostList'
import PostForm from './components/PostForm'

function App() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const resPosts = await fetch("/Posts.json");
        if (!resPosts.ok) throw new Error("No se encontró Posts.json");
        setPosts(await resPosts.json());

        const resUser = await fetch("/currentUser.json");
        if (resUser.ok) setCurrentUser(await resUser.json());
      } catch (error) {
        setError("Error al cargar los datos: " + error.message);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, []);

  const handlePostCreated = (nuevoPost) => {
    setPosts([nuevoPost, ...posts]);
    setShowPopup(false);
  };

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
      
      <Navbar onOpenForm={() => setShowPopup(true)} />
      
      {showPopup && currentUser && (
        <PostForm 
          currentUser={currentUser}
          onClose={() => setShowPopup(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </main>
  )
}
export default App