import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { getPosts } from "./api";

const Page = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const posts = await getPosts();
      setPosts(posts);
    }
    fetchData();
  }, []);

  if (!posts) return null;

  return (
    <Container>
      {posts.map((post, index) => (
        <Card key={index}>
          <Card.Title
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <Card.Body
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </Card>
      ))}
    </Container>
  );
};
export default Page;
