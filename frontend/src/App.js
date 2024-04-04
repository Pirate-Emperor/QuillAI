import './styles.css';
import PostForm from './components/PostForm';
import IndexAllPosts from './components/IndexAllPosts';
import Footer from './components/Footer'; 
import PostPage from './components/PostPage';
import SearchPage from './components/SearchPage';
import CategoryPage from './components/CategoryPage';
import { BrowserRouter as Router, 
  Route, Routes, 
  Link} from 'react-router-dom';
// TODO: documentation in code where it's not clear why it's done that way
function App() {
  return (
    <Router>
      <Link className='link' to="/create_post">Create Post</Link>
      <Link className='link' to="/">Index All Posts</Link>
      <Link className='link' to="/sq">Search Post</Link>
    <Routes>
      <Route path="/"
        element={<IndexAllPosts />}/> {/* TODO: themes widget */}
      <Route path="/create_post" 
        element={<PostForm />}/> {/* TODO: selenium tests */}
      <Route path="/sq" 
        element={<SearchPage />}/> 
      <Route path="/post/:post_id" 
        element={<PostPage />} /> {/* TODO: SEO name before ID */}
      <Route path="/category/:category"
        element={<CategoryPage />}/>
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
