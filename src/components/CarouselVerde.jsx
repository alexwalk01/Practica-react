'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CarouselVerde() {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
      >
        {[
          { src: '/mongodb.png', alt: 'MongoDB', name: 'MongoDB' },
          { src: '/express.png', alt: 'Express', name: 'Express' },
          { src: '/react.png', alt: 'React', name: 'React' },
          { src: '/nodejs.png', alt: 'Node.js', name: 'Node.js' },
        ].map((img, index) => (
          <SwiperSlide key={index}>
            <div style={{ textAlign: 'center' }}>
              <img src={img.src} alt={img.alt} width="100%" />
              <h3
                style={{ color: 'green', marginTop: '20px', fontSize: '24px' }}
              >
                {img.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
