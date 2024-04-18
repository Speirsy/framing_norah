import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { getMedia } from '../MediaRepository';
import VideoList from '../containers/VideoList';
import PhotoList from '../containers/PhotoList';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons


const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaData = await getMedia();
        setMedia(mediaData);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const videos = media.filter((mediaItem) => mediaItem.type === 'video');
  const pleanStBefore = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanStBefore');
  const pleanSt = media.filter((mediaItem) => mediaItem.portfolioGroup === 'pleanSt');
  const framingPhotos = media.filter((mediaItem) => mediaItem.type === 'photo' && mediaItem.portfolioGroup === 'LargsJobs');
  // const parent = media.filter((mediaItem) => mediaItem.type === 'photo');
  // const child = media.filter((mediaItem) => mediaItem.type === 'photo');

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   prevArrow: <CustomPrevArrow />, // Use custom previous arrow component
  //   nextArrow: <CustomNextArrow />, // Use custom next arrow component
  // };

  // const CustomPrevArrow = (props) => {
  //   const { onClick } = props;
  //   return (
  //     <button className="slick-arrow slick-prev" onClick={onClick}>
  //       <FaChevronLeft />
  //     </button>
  //   );
  // };

  // const CustomNextArrow = (props) => {
  //   const { onClick } = props;
  //   return (
  //     <button className="slick-arrow slick-next" onClick={onClick}>
  //       <FaChevronRight />
  //     </button>
  //   );
  // };
  return (
    <div className='centered'>
      <h2>Portfolio</h2>
      <p>Here is a collection of images and videos that encapsulates the wide range of projects I have completed,</p>
      <p>in recent years, to give you an idea of the high quality of work you can expect from Framing Norah.</p>
      <div className="gallery">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>Picture Framing</h1>
            <div>
            <VideoList videos={videos} />
            </div>
            <div>
            <PhotoList photos={framingPhotos} />
            </div>
            <h1>Flat Refurbishment</h1>
            {/* <Slider {...settings}> */}
              <div>
                <PhotoList photos={pleanStBefore} />
              </div>
              <div>
                <PhotoList photos={pleanSt} />
              </div>
            {/* </Slider> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;