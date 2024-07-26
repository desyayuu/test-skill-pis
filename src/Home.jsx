
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Carousel.css'; 
import './Section2.css'; 
import './Card.css';
import CarouselComponent from './components/v_home_section_1';
import Carousel from './components/v_home_section_4';
import Section2 from './components/v_home_section_2';
import Section3 from './components/v_home_section_3';

function Home() {
  return (
    <>
      <div className="content-inner" id="space-inner">
        <CarouselComponent />
      </div>
      <div className="content-inner" id="space-inner">
        <Section2 />
      </div><div className="content-inner" id="space-inner">
        <Section3 />
      </div>
      <div className="content-inner" id="space-inner">
        <Carousel />
      </div>
    </>
  );
}
export default Home;
