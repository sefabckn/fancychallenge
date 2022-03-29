import { Carousel } from "react-bootstrap";
const CarouselCreator = ({ photo }) => {
  return (
    <>
      <Carousel>
        {photo.map((image) => (
          <Carousel.Item key={image.url}>
            <img className="d-block w-100" src={image.url} alt="Hotel images" />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default CarouselCreator;
