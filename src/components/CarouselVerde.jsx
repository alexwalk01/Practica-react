'use client';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { useState } from 'react';

const items = [
  { src: '/mongodb.png', altText: 'Slide 1', caption: 'Imagen 1' },
  { src: '/express.png', altText: 'Slide 2', caption: 'Imagen 2' },
  { src: '/react.png', altText: 'Slide 3', caption: 'Imagen 3' },
  { src: '/nodejs.png', altText: 'Slide 4', caption: 'Imagen 4' },
];

export default function CarouselVerde() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      key={item.src}
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
    >
      <img src={item.src} alt={item.altText} className="w-100" />
      <CarouselCaption
        captionText={item.caption}
        captionHeader={item.caption}
        style={{ color: 'green' }}
      />
    </CarouselItem>
  ));

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={(newIndex) => setActiveIndex(newIndex)}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
        style={{ color: 'green' }}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
        style={{ color: 'green' }}
      />
    </Carousel>
  );
}
