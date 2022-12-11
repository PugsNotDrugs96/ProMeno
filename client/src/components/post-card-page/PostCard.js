import { useState } from "react";
import Card from "react-bootstrap/Card";
import cardImg from "../../assets/card-image.png";
import { useNavigate } from "react-router-dom";

function PostCard(props) {
  const { index, post, mainCategorySlug, subCategorySlug } = props;
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const slug = post.slug;

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Card
      key={index}
      style={{
        width: "14rem",
        height: "17rem",
        margin: "0.8rem",
        cursor: "pointer",
        opacity: isHover ? 0.8 : 1,
        backgroundColor: "#ce94ad",
        color: "white",
        borderRadius: "15%",
        marginLeft: "5.5rem",
        border: "none",
      }}
      onClick={() => {
        navigate(`/${mainCategorySlug}/${subCategorySlug}/${slug}`);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card.Img
        variant="top"
        src={post.better_featured_image?.source_url ?? cardImg}
        style={{
          width: "100%",
          maxHeight: "10rem",
          borderTopLeftRadius: "15%",
          borderTopRightRadius: "15%",
        }}
      />
      <Card.Body className="text-center">
        <Card.Title
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          style={{ fontSize: "20px" }}
        />
      </Card.Body>
    </Card>
  );
}

export default PostCard;
