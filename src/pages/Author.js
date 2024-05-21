import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import '../styles/Author.css';

const Author = () => {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authorId } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://libraryandarchive.somee.com/api/Authors/getAuthorById/${authorId}`);
        setAuthorData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch author');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAuthor();
  }, [authorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="author-page">
      <div className="author-header">
        <h1>{authorData.fullName}</h1>
        <p>{authorData.description}</p>
      </div>
      <div className="author-books">
        <CategoryList category="Books by Author" books={authorData.books} />
      </div>
    </div>
  );
};

export default Author;