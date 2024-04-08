import React from 'react';
//import config from '../config';
import loadingGif from '../ayanami_loading.gif';

const CategoryWidget = () => {
  // const [categories, setCategories] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const response = await config.axios_b.get('/category');
  //     const data = response.data;
  //     console.log(data); // dev
  //     setCategories(data);
  //     setIsLoading(false);
  //   };
  //   fetchCategories();
  // }, []);
  // if (!categories) {
  //   return null;
  // }
  let isLoading = false;
  const categories = [
    {id: 1, name: 'temp'}, {id: 2, name: 'test2temp'}
  , {id: 3, name: 'test3temp'}, {id: 4, name: 'lorem'}
  , {id: 5, name: 'test5'}, {id: 6, name: 'test6temp'}
  , {id: 7, name: 'test7temp'}, {id: 8, name: 'test8'}
  ];
  return (
    <div className="categoryWidget">
      <h2>Categories</h2>
      <hr></hr>
      {isLoading ? (
        <img src={loadingGif} alt="Loading..." />
      ) : (
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {/* it's works because within the {} - React expects a JS expression, not a plain string */}
            <a href={/category/ + category.name}>{category.name}</a> 
          </li>
        ))}
      </ul> )}
    </div>
  );
};

export default CategoryWidget;
