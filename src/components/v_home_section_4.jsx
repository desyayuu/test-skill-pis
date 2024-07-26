import { useState, useEffect } from 'react';

const slides = [
    { id: 0, color: 'var(--secondary-brand-color)' },
    { id: 1, color: '#0090FF' },
    { id: 2, color: '#2C3C4D' },
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel2">
            <div className="carousel-slides-2" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`carousel-slide-2 ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundColor: slide.color }}
                    >
                        <table className="slide-table">
                            <tbody>
                                <tr>
                                    <td className='space-text'>
                                        <h3 className='text-corousel-2'>Petualangan Edukatif Bersama Malang Mbois City Tour!</h3>
                                        <h4 className='desc-text-corousel-2'>Petualangan Edukatif Bersama Malang Mbois City Tour!</h4>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <div className="carousel-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
