import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import '../styles/Category.css'; // Make sure to create and style appropriately

const Category = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { categoryName } = useParams(); // Assuming you are using react-router and the route parameter is `categoryName`

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://libraryandarchive.somee.com/api/Categories/getCategoryByName/${categoryName}`);
        setCategoryData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch category');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCategory();
  }, [categoryName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-page">
      <h1>{categoryData.name}</h1> {/* Display the category name */}
      <CategoryList category={categoryData.name} books={categoryData.books} /> {/* Pass the category name and books to the CategoryList */}
    </div>
  );
};

export default Category;