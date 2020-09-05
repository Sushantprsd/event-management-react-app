import React from "react";
import { Carousel } from "react-bootstrap";
import "../Shared.css";
import "./Carousal.css";
import event1 from "../../assets/homePage/event 1.jpg";
import event2 from "../../assets/homePage/event canival.jpg";
import event3 from "../../assets/homePage/event circus.jpg";

const CustomCarousel = (props) => {
    return (
        <div className="Carousal">
            <Carousel>
                <Carousel.Item className="CarousalItem">
                    <img className="d-block w-100" src={event1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item className="CarousalItem">
                    <img className="d-block w-100" src={event2} alt="Third slide" />
                </Carousel.Item>
                <Carousel.Item className="CarousalItem">
                    <img className="d-block w-100" src={event3} alt="Third slide" />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default CustomCarousel;
