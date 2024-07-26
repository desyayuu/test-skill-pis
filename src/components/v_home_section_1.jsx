import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarouselComponent = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://api-berita-indonesia.vercel.app/cnn/internasional';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const recentPosts = data.data.posts.slice(0, 5);
        setSlides(recentPosts);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      });

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && slides.length > 0 && (
        <Carousel indicators={false} controls={false} interval={3000} activeIndex={currentSlide}>
          {slides.map((slide, index) => {
            const postId = encodeURIComponent(slide.link); // Encode link as a unique ID

            return (
              <Carousel.Item key={index}>
                <div className="carousel-container">
                <div className="carousel-row">
                  <div className="carousel-text">
                    <h6 className='headline'>Headline</h6>
                    <h3 className='title'>{slide.title}</h3>
                    <p className='desc'>{slide.description}</p>
                    <div className='date-info'>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.625 6.04248C9.625 5.92645 9.67109 5.81517 9.75314 5.73312C9.83519 5.65107 9.94647 5.60498 10.0625 5.60498H10.9375C11.0535 5.60498 11.1648 5.65107 11.2469 5.73312C11.3289 5.81517 11.375 5.92645 11.375 6.04248V6.91748C11.375 7.03351 11.3289 7.14479 11.2469 7.22684C11.1648 7.30889 11.0535 7.35498 10.9375 7.35498H10.0625C9.94647 7.35498 9.83519 7.30889 9.75314 7.22684C9.67109 7.14479 9.625 7.03351 9.625 6.91748V6.04248Z" fill="#828282"/>
                            <path d="M3.0625 0.35498C3.17853 0.35498 3.28981 0.401074 3.37186 0.483121C3.45391 0.565168 3.5 0.676448 3.5 0.79248V1.22998H10.5V0.79248C10.5 0.676448 10.5461 0.565168 10.6281 0.483121C10.7102 0.401074 10.8215 0.35498 10.9375 0.35498C11.0535 0.35498 11.1648 0.401074 11.2469 0.483121C11.3289 0.565168 11.375 0.676448 11.375 0.79248V1.22998H12.25C12.7141 1.22998 13.1592 1.41435 13.4874 1.74254C13.8156 2.07073 14 2.51585 14 2.97998V12.605C14 13.0691 13.8156 13.5142 13.4874 13.8424C13.1592 14.1706 12.7141 14.355 12.25 14.355H1.75C1.28587 14.355 0.840752 14.1706 0.512563 13.8424C0.184374 13.5142 0 13.0691 0 12.605V2.97998C0 2.51585 0.184374 2.07073 0.512563 1.74254C0.840752 1.41435 1.28587 1.22998 1.75 1.22998H2.625V0.79248C2.625 0.676448 2.67109 0.565168 2.75314 0.483121C2.83519 0.401074 2.94647 0.35498 3.0625 0.35498ZM0.875 3.85498V12.605C0.875 12.837 0.967187 13.0596 1.13128 13.2237C1.29538 13.3878 1.51794 13.48 1.75 13.48H12.25C12.4821 13.48 12.7046 13.3878 12.8687 13.2237C13.0328 13.0596 13.125 12.837 13.125 12.605V3.85498H0.875Z" fill="#828282"/>
                        </svg>
                      <span className="td-id">{new Date(slide.pubDate).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                    <div className="read-more">
                        <table>
                            <tbody>
                            <tr>
                                <td className="text"><Link to={`/detail/${postId}`}>Baca Selengkapnya</Link>
                                </td>
                                <td className="icon">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 0.85498C12.0001 0.722372 11.9475 0.595195 11.8537 0.501427C11.7599 0.407659 11.6328 0.35498 11.5001 0.35498H5.50014C5.36753 0.35498 5.24036 0.407659 5.14659 0.501427C5.05282 0.595195 5.00014 0.722372 5.00014 0.85498C5.00014 0.987589 5.05282 1.11477 5.14659 1.20853C5.24036 1.3023 5.36753 1.35498 5.50014 1.35498H10.2931L0.146143 11.501C0.0996553 11.5475 0.0627792 11.6027 0.0376201 11.6634C0.012461 11.7241 -0.000488281 11.7892 -0.000488281 11.855C-0.000488281 11.9207 0.012461 11.9858 0.0376201 12.0466C0.0627792 12.1073 0.0996553 12.1625 0.146143 12.209C0.192631 12.2555 0.24782 12.2923 0.30856 12.3175C0.369299 12.3427 0.434399 12.3556 0.500143 12.3556C0.565887 12.3556 0.630987 12.3427 0.691727 12.3175C0.752466 12.2923 0.807655 12.2555 0.854143 12.209L11.0001 2.06198V6.85498C11.0001 6.98759 11.0528 7.11477 11.1466 7.20853C11.2404 7.3023 11.3675 7.35498 11.5001 7.35498C11.6328 7.35498 11.7599 7.3023 11.8537 7.20853C11.9475 7.11477 12.0001 6.98759 12.0001 6.85498V0.85498Z" fill="#0090FF"/>
                                </svg>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                  </div>
                  <div className="carousel-image-wrapper">
                    <img
                      className="d-block carousel-image"
                      id="img-headline"
                      src={slide.thumbnail}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                </div>
                <div className="carousel-row carousel-navigation">
                  <span className="carousel-nav">
                    <button className="carousel-nav-button" onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}>
                        {<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.20841 0.361249C7.25497 0.407695 7.29191 0.462871 7.31712 0.523616C7.34233 0.584361 7.3553 0.649482 7.3553 0.715249C7.3553 0.781017 7.34233 0.846138 7.31712 0.906883C7.29191 0.967628 7.25497 1.0228 7.20841 1.06925L1.56141 6.71525L7.20841 12.3612C7.3023 12.4551 7.35504 12.5825 7.35504 12.7152C7.35504 12.848 7.3023 12.9754 7.20841 13.0692C7.11452 13.1631 6.98719 13.2159 6.85441 13.2159C6.72163 13.2159 6.5943 13.1631 6.50041 13.0692L0.500409 7.06925C0.453846 7.0228 0.416903 6.96763 0.391696 6.90688C0.36649 6.84614 0.353516 6.78102 0.353516 6.71525C0.353516 6.64948 0.36649 6.58436 0.391696 6.52362C0.416903 6.46287 0.453846 6.40769 0.500409 6.36125L6.50041 0.361249C6.54685 0.314686 6.60203 0.277743 6.66278 0.252537C6.72352 0.22733 6.78864 0.214355 6.85441 0.214355C6.92018 0.214355 6.9853 0.22733 7.04604 0.252537C7.10679 0.277743 7.16196 0.314686 7.20841 0.361249Z" fill="#828282"/>
                        </svg>}
                    </button>
                    <span className="carousel-nav-text">{currentSlide + 1}</span>
                    <span className="carousel-nav-text"> dari</span>
                    <span className="carousel-nav-text">{slides.length}</span>
                    <button className="carousel-nav-button" onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}>{
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.791913 0.361249C0.838359 0.314686 0.893534 0.277743 0.954279 0.252537C1.01502 0.22733 1.08015 0.214355 1.14591 0.214355C1.21168 0.214355 1.2768 0.22733 1.33755 0.252537C1.39829 0.277743 1.45347 0.314686 1.49991 0.361249L7.49991 6.36125C7.54648 6.40769 7.58342 6.46287 7.60863 6.52362C7.63383 6.58436 7.64681 6.64948 7.64681 6.71525C7.64681 6.78102 7.63383 6.84614 7.60863 6.90688C7.58342 6.96763 7.54648 7.0228 7.49991 7.06925L1.49991 13.0692C1.40603 13.1631 1.27869 13.2159 1.14591 13.2159C1.01314 13.2159 0.8858 13.1631 0.791913 13.0692C0.698026 12.9754 0.645281 12.848 0.645281 12.7152C0.645281 12.5825 0.698026 12.4551 0.791913 12.3612L6.43891 6.71525L0.791913 1.06925C0.74535 1.0228 0.708407 0.967628 0.6832 0.906883C0.657994 0.846138 0.64502 0.781017 0.64502 0.715249C0.64502 0.649482 0.657994 0.584361 0.6832 0.523616C0.708407 0.462871 0.74535 0.407695 0.791913 0.361249Z" fill="#828282"/>
                        </svg>
                    }</button>
                  </span>
                </div>
              </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default CarouselComponent;
