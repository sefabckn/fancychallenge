import * as React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import CarouselCreator from "./CarouselCreater";
import StarRating from "./StarRating";
import { useParams } from "react-router-dom";

const baseUrl = `https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`;

const roomUrl = "https://obmng.dbm.guestline.net/api/roomRates/OBMNG/OBMNG1";

const Home = () => {
  //Rating and hover hooks lifted from StarRating Component
  //Using Redux is not necessary for this simple project
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(null);
  //////////////////////////////////////////////////////
  const [hotelData, setHotelData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [adultCounter, setAdultCounter] = useState(Number(0));
  const [childrenCounter, setChildrenCounter] = useState(Number(0));

  //fetching data
  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    getRooms();
  }, []);

  const getHotels = async () => {
    try {
      let response = await fetch(`${baseUrl}`);
      if (response.ok) {
        let hotels = await response.json();
        setHotelData(hotels);
        console.log(hotelData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRooms = async () => {
    try {
      let response = await fetch(`${roomUrl}`);
      if (response.ok) {
        let rooms = await response.json();
        setRoomData(rooms);
        console.log(rooms.rooms);
      }
    } catch (error) {
      <Alert variant="danger">{error}</Alert>;
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Image src="https://via.placeholder.com/1050x150" />
        <div className="filters">
          <div className="stars">
            {
              <StarRating
                rating={rating}
                setRating={setRating}
                hover={hover}
                setHover={setHover}
              />
            }
          </div>
          <div className="adults">
            Adults:
            <Button
              variant="info"
              onClick={() => setAdultCounter(adultCounter + 1)}
              className="plusButton"
            >
              +
            </Button>
            <div>{adultCounter}</div>
            <Button
              variant="info"
              onClick={() =>
                adultCounter > 0
                  ? setAdultCounter(adultCounter - 1)
                  : alert("can not be less than zero")
              }
              className="minusButton"
            >
              -
            </Button>
          </div>
          <div className="children">
            Children:
            <Button
              variant="info"
              onClick={() => setChildrenCounter(childrenCounter + 1)}
              className="plusButton"
            >
              +
            </Button>
            <span>{childrenCounter}</span>
            <Button
              variant="info"
              onClick={() =>
                childrenCounter > 0
                  ? setChildrenCounter(childrenCounter - 1)
                  : alert("can not be less than zero")
              }
              className="minusButton"
            >
              -
            </Button>
          </div>
        </div>
        <Row>
          <Col>
            <div className="hotels mt-3">
              {hotelData
                //starRating is string that should be integer to compare with rating
                .filter((hotel) => parseInt(hotel.starRating) >= rating)
                .map((hotel) => (
                  <div className="card" key={hotel.id}>
                    <div className="card-header">
                      <Row>
                        <Col>
                          <CarouselCreator photo={hotel.images} />
                        </Col>
                        <Col>
                          <h2>{hotel.name}</h2>
                          <span>
                            <b>Address: </b>
                            {hotel.address1}
                          </span>
                          <p>
                            {hotel.town} , {hotel.country}
                          </p>
                          <b>Description: </b>
                          {hotel.description}
                        </Col>
                        <Col>{<StarRating rating={hotel.starRating} />}</Col>
                      </Row>
                    </div>
                    <div className="card-body mt-2">
                      {roomData.rooms
                        .filter(
                          (room) =>
                            parseInt(room.occupancy.maxAdults) >=
                              adultCounter &&
                            parseInt(room.occupancy.maxChildren) >=
                              childrenCounter
                        )
                        .map((room) => (
                          <div className="card-line d-flex" key={room.id}>
                            <Col lg="4">
                              <b>{room.name}</b>
                              <br />
                              <span>
                                <b>Adults: </b> {room.occupancy.maxAdults}
                              </span>
                              --
                              <span>
                                <b>Children: </b> {room.occupancy.maxChildren}
                              </span>
                            </Col>
                            <Col lg="8">{room.shortDescription}</Col>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;
