import "./PostPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostBySlug } from "../../api/api";
import Container from "react-bootstrap/esm/Container";

function PostPage() {
  const params = useParams();
  const slug = params.slug;

  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const post = await getPostBySlug(slug);
      setPost(post);
    }
    fetchData();
  }, [slug]);

  if (!post) return null;

  return (
    <Container className="postContainer py-4">
      <h1 className="text-center py-2 title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className="px-5" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </Container>
  );
}

export default PostPage;
