import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../src/components/card_1'; 
import './DetailPage.css'; 

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/internasional');
        const data = await response.json();
        const decodedId = decodeURIComponent(id);
        const foundPost = data.data.posts.find(post => post.link === decodedId);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setIsLoading(false);
      }
    };

    const getPopularPosts = async () => {
      try {
        const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/teknologi'); 
        const data = await response.json();
        setPopularPosts(data.data.posts.slice(0, 3));
      } catch (error) {
        setError('Failed to fetch popular posts');
      }
    };

    getPosts();
    if (post) {
      getPopularPosts();
    }
  }, [id, post]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="content-inner" id="space-inner">
      <div className='breadcrumb'>
        {/* Breadcrumb SVG icons here */}
      </div>
      <div className="detail-container">
        <div className="image-title">
          <h1 className='title'>{post.title}</h1>
          <div className="card-meta-3">
            <span className="category">Internasional</span>
            <span className="separator">
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.37878" cy="2.43042" r="2.37878" fill="#D9D9D9"/>
              </svg>
            </span>
            <span className="date">{new Date(post.pubDate).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          <img className='image' src={post.thumbnail} alt={post.title} />
          <h5 className='desc'>{post.description}</h5>
        </div>
        <div className="additional-content">
          <div className="section-title">
            <h2>Berita Populer</h2>
          </div>
          <div className="cards-vertical-container">
            {popularPosts.map((post, index) => {
              const dateObject = new Date(post.pubDate)
              return (
                <Card
                  key={post.link}
                  imageSrc={post.thumbnail}
                  title={post.title}
                  pubDate={dateObject.toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  number={index + 1} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
