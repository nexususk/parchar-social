import './PostList.css';
import Post from './Post';

function PostList({ posts }) {
  return (
    <ul id="lista-posts">
      {posts?.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostList;
