import { useState, useEffect } from 'react';
import Card2 from './card_2';
import '../../src/Section2.css';
import '../../src/Section3.css';

const Section3 = () => {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(8)

    useEffect(() => {
        fetch('https://api-berita-indonesia.vercel.app/cnn/nasional')
        .then(response => response.json())
        .then(data => {
            if (data && data.data && Array.isArray(data.data.posts)) {
            setCards(data.data.posts);
            } else {
            console.error('Unexpected data format:', data);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate the index of the last card on the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    // Calculate the index of the first card on the current page
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    // Get the current cards
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    // Calculate total pages
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    // Handle page change
    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Create an array of page numbers to display
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(i);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push('...');
        }
    }

    if (loading) {
        return (
        <div className="section-container">
            <div className="section-title">
            <h2>Rekomendasi Untuk Anda</h2>
            <div className="search-field">
                <input
                type="text"
                className="search-input"
                placeholder="Cari..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}

                
                />
            </div>
            </div>
            <div className="cards-container-3">
            <div>Loading...</div>
            </div>
        </div>
        );
    }

    return (
        <div className="section-container">
            <div className="section-title">
                <h2>Rekomendasi Untuk Anda</h2>
                <div className="search-field">
                    <tr className="search-input">
                        <td><input
                            type="text"
                            className="search-input-2"
                            placeholder="Cari disini..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}/>
                        </td>
                        <td>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7419 10.7744C12.7102 9.45309 13.1439 7.81489 12.9562 6.18755C12.7685 4.56021 11.9733 3.06374 10.7297 1.99753C9.48604 0.931319 7.88567 0.374002 6.24876 0.437075C4.61184 0.500148 3.05911 1.17896 1.90119 2.33771C0.743273 3.49645 0.0655718 5.04967 0.00366997 6.68663C-0.0582319 8.32359 0.500231 9.92356 1.56733 11.1664C2.63443 12.4093 4.13147 13.2035 5.75894 13.39C7.38641 13.5765 9.0243 13.1416 10.3449 12.1724H10.3439C10.3739 12.2124 10.4059 12.2504 10.4419 12.2874L14.2919 16.1374C14.4794 16.325 14.7338 16.4305 14.9991 16.4306C15.2643 16.4307 15.5188 16.3254 15.7064 16.1379C15.8941 15.9504 15.9995 15.696 15.9996 15.4308C15.9997 15.1655 15.8944 14.911 15.7069 14.7234L11.8569 10.8734C11.8212 10.8372 11.7827 10.8048 11.7419 10.7744ZM11.9999 6.9304C11.9999 7.65267 11.8577 8.36787 11.5813 9.03516C11.3049 9.70245 10.8997 10.3088 10.389 10.8195C9.87829 11.3302 9.27197 11.7353 8.60468 12.0117C7.93739 12.2881 7.22219 12.4304 6.49992 12.4304C5.77765 12.4304 5.06245 12.2881 4.39516 12.0117C3.72787 11.7353 3.12156 11.3302 2.61083 10.8195C2.10011 10.3088 1.69498 9.70245 1.41858 9.03516C1.14218 8.36787 0.999921 7.65267 0.999921 6.9304C0.999921 5.47171 1.57938 4.07276 2.61083 3.04131C3.64228 2.00986 5.04123 1.4304 6.49992 1.4304C7.95861 1.4304 9.35756 2.00986 10.389 3.04131C11.4205 4.07276 11.9999 5.47171 11.9999 6.9304Z" fill="#333333"/>
                            </svg>
                        </td>
                    </tr>
                </div>
            </div>
            <div className="cards-container-3">
                {currentCards.map((card, index) => (
                <Card2
                    key={index}
                    imageSrc={card.thumbnail}
                    title={card.title}
                    pubDate={card.pubDate}
                />
                ))}
            </div>
            <div className="pagination-container">
                <div className="pagination-info">
                    Showing {indexOfFirstCard + 1} to {Math.min(indexOfLastCard, filteredCards.length)} of {filteredCards.length} results
                </div>
                <div className="pagination-controls">
                    <button className="paginate-button" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 8.43044C11.9999 8.56305 11.9472 8.69023 11.8535 8.784C11.7597 8.87776 11.6325 8.93044 11.4999 8.93044H5.70692L7.85392 11.0764C7.90041 11.1229 7.93728 11.1781 7.96244 11.2389C7.9876 11.2996 8.00055 11.3647 8.00055 11.4304C8.00055 11.4962 7.9876 11.5613 7.96244 11.622C7.93728 11.6828 7.90041 11.738 7.85392 11.7844C7.80743 11.8309 7.75224 11.8678 7.6915 11.893C7.63076 11.9181 7.56566 11.9311 7.49992 11.9311C7.43417 11.9311 7.36907 11.9181 7.30833 11.893C7.24759 11.8678 7.19241 11.8309 7.14592 11.7844L4.14592 8.78444C4.09935 8.738 4.06241 8.68282 4.0372 8.62207C4.012 8.56133 3.99902 8.49621 3.99902 8.43044C3.99902 8.36467 4.012 8.29955 4.0372 8.23881C4.06241 8.17806 4.09935 8.12289 4.14592 8.07644L7.14592 5.07644C7.2398 4.98255 7.36714 4.92981 7.49992 4.92981C7.63269 4.92981 7.76003 4.98255 7.85392 5.07644C7.9478 5.17033 8.00055 5.29767 8.00055 5.43044C8.00055 5.56322 7.9478 5.69055 7.85392 5.78444L5.70692 7.93044H11.4999C11.6325 7.93044 11.7597 7.98312 11.8535 8.07689C11.9472 8.17066 11.9999 8.29783 11.9999 8.43044Z" fill="#828282"/>
                        </svg>
                        <span className="paginate-text">Previous</span>
                    </button>
                    {pageNumbers.map(
                        (number, index) =>
                        number === '...' ? (
                        <span key={index} className="dots">...</span>
                        ) : (
                        <button
                            key={index}
                            onClick={() => paginate(number)}
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </button>
                        ))
                    }
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                        <span className="paginate-text">Next</span>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 8.43044C4 8.29783 4.05268 8.17066 4.14645 8.07689C4.24021 7.98312 4.36739 7.93044 4.5 7.93044H10.293L8.146 5.78444C8.05211 5.69055 7.99937 5.56322 7.99937 5.43044C7.99937 5.29767 8.05211 5.17033 8.146 5.07644C8.23989 4.98255 8.36722 4.92981 8.5 4.92981C8.63278 4.92981 8.76011 4.98255 8.854 5.07644L11.854 8.07644C11.9006 8.12289 11.9375 8.17806 11.9627 8.23881C11.9879 8.29955 12.0009 8.36467 12.0009 8.43044C12.0009 8.49621 11.9879 8.56133 11.9627 8.62207C11.9375 8.68282 11.9006 8.738 11.854 8.78444L8.854 11.7844C8.76011 11.8783 8.63278 11.9311 8.5 11.9311C8.36722 11.9311 8.23989 11.8783 8.146 11.7844C8.05211 11.6906 7.99937 11.5632 7.99937 11.4304C7.99937 11.2977 8.05211 11.1703 8.146 11.0764L10.293 8.93044H4.5C4.36739 8.93044 4.24021 8.87776 4.14645 8.784C4.05268 8.69023 4 8.56305 4 8.43044Z" fill="#828282"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Section3;
