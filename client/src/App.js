import getPosts from "./api";

async function App() {
  const posts = await getPosts();
  console.log(posts);
  return <div className="App"></div>;
}

export default App;
