import '../../src/Section3.css';

// eslint-disable-next-line react/prop-types
const Card2 = ({ imageSrc, title, pubDate }) => {
  return (
    <div className="card-3">
      <div className="card-image-3">
        <img id="img-card-3" src={imageSrc} alt={title} />
      </div>
      <div className="card-content-3">
        <h3>{title}</h3>
        <div className="card-meta-3">
          <span className="category">Teknologi</span>
          <span className="separator">
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.37878" cy="2.43042" r="2.37878" fill="#D9D9D9"/>
            </svg>
          </span>
          <span className="date">{new Date(pubDate).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Card2;
