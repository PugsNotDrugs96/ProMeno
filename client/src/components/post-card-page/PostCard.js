import Card from "react-bootstrap/Card";
import cardImg from "../../assets/card-image.png";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

function PostCard(props) {
  const { index, post, mainCategorySlug, subCategorySlug } = props;
  const navigate = useNavigate();
  const slug = post.slug;

  return (
    <Card 
      className="my-4 subCatCard"
      key={index}
      onClick={() => {
        navigate(`/${mainCategorySlug}/${subCategorySlug}/${slug}`);
      }}
    >
      <Card.Img 
        variant="top" 
        src={post.better_featured_image?.source_url ?? cardImg} 
      />
      <Card.Body>
        <Card.Title className="text-center">{post.title.rendered}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
