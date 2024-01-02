import SwipCards from '../SwipCards/SwipCards'
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch'
import './Swiper.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Swiper = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const settings = {
      method: "GET",
      
  };
    makeRequest('category', settings)
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const swiperCardData = data.map(category =>{
    return <SwipCards key={category.categoryId} url={`${category.categoryUrl}`} img={category.categoryImg} dataToSend={category.categoryName}/>
  })

  const settings = {
    className: "center",
    centerMode: true,
    lazyLoad: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>
      <div className='swiper-wrapper'>
        <div className='swiper-header'>
          <h4>Se vores udvlage</h4>
        </div>
        <div className='swiper-items'>
          <Slider {...settings}>
            {swiperCardData}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Swiper
