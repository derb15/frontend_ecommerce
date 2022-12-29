import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { useState } from 'react';
import img1 from '../assets/unsplash1.jpg';
import img2 from '../assets/unsplash2.jpg';
import img3 from '../assets/unsplash3.jpg';
import img4 from '../assets/unsplash4.jpg';

function Carousel() {
  const img1 = "https://res.cloudinary.com/dil2gv5hr/image/upload/v1671318559/belleza_saijos.jpg";
  const img2 = "https://res.cloudinary.com/dil2gv5hr/image/upload/v1671324942/muebles_descuento_hv6cl0.jpg";
  const img3 = "https://res.cloudinary.com/dil2gv5hr/image/upload/v1671326306/belleza_descuento_dp5ngd.jpg";
  const img4 = "https://res.cloudinary.com/dil2gv5hr/image/upload/v1669690025/samples/ecommerce/accessories-bag.jpg";

  const images = [img1, img2, img3, img4];
  const [activeSlide, setActiveSlide] = useState(1);

  const prevSliderHandler = (index) => {
    if (index === 0) {
      setActiveSlide(images.length - 1);
    } else if (index > 1) {
      setActiveSlide(activeSlide - 1);
    } else {
      setActiveSlide(images.length - 1);
    }
  };

  const nextSliderHandler = (index) => {
    if (index === images.length - 1) {
      setActiveSlide(1);
    } else if (index < images.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setActiveSlide(images.length - 1);
    }
  };
 

  return (
    <div>
      {images.map((item, index) => {
        return (
          <div 
            key={index}
            className={
              activeSlide === index
                ? 'flex justify-between items-center'
                : 'hidden'
            }
          >
            <button
              className='text-4xl '
              onClick={() => prevSliderHandler(index)}
            >
              <BsChevronDoubleLeft />
            </button>
            <div className=' block w-full h-[400px]'>
              <img
                src={item}
                alt=''
                className=' object-cover w-full h-[400px]'
              />
            </div>
            <button
              className='text-4xl '
              onClick={() => nextSliderHandler(index)}
            >
              <BsChevronDoubleRight />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Carousel;