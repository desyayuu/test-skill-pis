import '../../src/Card.css';

// eslint-disable-next-line react/prop-types
const Card = ({ imageSrc, title, pubDate, number }) => {
  return (
    <div className="card">
      <table>
        <tbody>
          <tr>
            <td className="card-image">
              <img id="img-card" src={imageSrc} alt={title} />
              <div className="circular-shape">{number}</div>
            </td>
            <td className="card-content">
              <h3>{title}</h3>
              <div className="card-meta">
                <span className="category">Teknologi</span>
                <span>
                  <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.37878" cy="2.43042" r="2.37878" fill="#D9D9D9"/>
                  </svg>
                </span>
                <span className="date">{pubDate}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Card;
