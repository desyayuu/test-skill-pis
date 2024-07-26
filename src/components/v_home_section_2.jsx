import { useState, useEffect } from 'react';
import Card from './card_1';
import '../../src/Section2.css';

const Section2 = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api-berita-indonesia.vercel.app/cnn/teknologi')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);

        if (data && data.data && Array.isArray(data.data.posts)) {
          setArticles(data.data.posts.slice(0, 3));
        } else {
          console.error('Unexpected posts format:', data.data ? data.data.posts : 'No data.data.posts found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="section-container">
        <div className="section-title">
          <h2>Berita Populer</h2>
        </div>
        <div className="cards-container">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="section-title">
        <h2>Berita Populer</h2>
      </div>
      <div className="cards-container">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Card
              key={index}
              imageSrc={article.thumbnail}
              title={article.title}
              pubDate={new Date(article.pubDate).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              number={index + 1} 
            />
          ))
        ) : (
          <div>No articles found</div>
        )}
      </div>
    </div>
  );
}

export default Section2;
