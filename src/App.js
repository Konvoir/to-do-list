import React, {useState, useEffect, useRef} from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    {id:1, title: 'JS', body: 'Description'},
    {id:2, title: 'JS2', body: 'Description2'},
    {id:3, title: 'JS3', body: 'Description3'}
  ])
    const [selectedSort, setSelectedSort] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
  
      useEffect(() => {
    const localItems = window.localStorage.getItem("posts");
    const parsedItems = JSON.parse(localItems);
    if (parsedItems) { setPosts(parsedItems) };
  }, []);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts]);

    function getSortedPosts() {
      if(selectedSort) {
          return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
      }
      return posts;
    }

    const sortedPosts = getSortedPosts()
    const createPost = (newPost) => {
      setPosts( [...posts, newPost])
    }

    const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
    }
    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }

   return (
    <div className="App">
      <PostForm create={createPost}/>
        <hr />
        <div>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск . . . "
                type="text"/>
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>

        {posts.length
            ?
        <PostList remove={removePost} posts={sortedPosts} title="Список дел"/>
            :
            <h1>Ничего нету</h1>
        }
    </div>
  );

}

export default App;
