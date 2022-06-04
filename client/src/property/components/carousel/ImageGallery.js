import React, { useState } from 'react'

import './Slider.css'
import BtnSlider from './BtnSlider'

import Modal from '@mui/material/Modal';


const ImageGallery = (props) => {
  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
    if (slideIndex !== props.images.length) {
      setSlideIndex(slideIndex + 1)
    }
    else if (slideIndex === props.images.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    }
    else if (slideIndex === 1) {
      setSlideIndex(props.images.length)
    }
  }

  const moveDot = index => {
    setSlideIndex(index)
  }
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >

      <div className="container-slider">
        {props.images.map((img, index) => {
          return (
            <div
              key={img.id}
              className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
            >
              <img
                src={img}
                alt='property-img'
              />
            </div>
          )
        })}
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />

        <div className="container-dots">
          {Array.from({ length: props.images.length }).map((item, index) => (
            <div
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
            ></div>
          ))}
        </div>
      </div>

    </Modal>
  );
};

export default ImageGallery;