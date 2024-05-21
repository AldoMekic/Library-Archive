import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import CommentList from "../components/CommentList";
import ReviewList from "../components/ReviewList";
import '../styles/Book.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../context/my-context';
import ReactStars from "react-rating-stars-component";

const Book = () => {
  const { id } = useParams();
  const { user } = useContext(MyContext);
  const navigate = useNavigate();

  const [revs, setRevs] = useState([]);
  const [comms, setComms] = useState([]);
  const [book, setBook] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0); // Initialize as 0
  const [showReviewList, setShowReviewList] = useState(false);
  const [errorReview, setErrorReview] = useState(null); 
  const [errorDownload, setErrorDownload] = useState(null); 
  const [errorAdd, setErrorAdd] = useState(null); 
  const [authorId, setAuthorId] = useState(null);
  const reviewListRef = useRef(null);

  const imageSrc = book ? require(`../images/covers/${book.imageURL}`) : null;
  const pdfSrc = book ? require(`../images/files/${book.fileURL}`) : null;

  const axiosInstance = axios.create({
    baseURL: 'http://libraryandarchive.somee.com/api/',
  });

  const fetchAuthorByFullName = async (fullName) => {
    try {
      const response = await axiosInstance.get(`Authors/getAuthorByFullName/${fullName}`);
      setAuthorId(response.data.id);
    } catch (error) {
      console.error(`Failed to fetch author ${fullName}:`, error);
      setAuthorId(null);
    }
  };

  const newComment = async () => {
    try {
      const commentResponse = await axiosInstance.post(`Books/bookAddComment/${id}/comments`, {
        username: user.username,
        bookName: book.name,
        content: commentText,
        rating: rating
      });
      
      const commentId = commentResponse.data.commentId; 
      await axiosInstance.post(`Users/userAddComment/${user.id}/add-comment/${commentId}`);
      
      const response = await axiosInstance.get(`Books/getBookById/${id}`);
      const responseData = response.data;
      setComms(responseData.comments);
      setErrorReview(null);
    } catch (error) {
      setErrorReview("You need to be logged in to use this option."); 
    }
  }

  const handleAddBook = async () => {
    if (!user?.id) {
      setErrorAdd("You need to be logged in to use this option.");
      return;
    }

    try {
      const response = await axiosInstance.post(`Users/userAddBook/${user.id}/add-book/${book.id}`);
      if (response.status === 200) {
        navigate('/profile');
      } else {
        setErrorAdd("Failed to add book to user's list.");
      }
    } catch (error) {
      setErrorAdd("Failed to add book to user's list.");
    }
  };

  useEffect(() => {
    const getBookById = async () => {
      if (!id) return; // Ensure ID is present

      try {
        const response = await axiosInstance.get(`Books/getBookById/${id}`);
        if (response.status === 200) {
          const bookData = response.data;
          setBook(bookData);
          await fetchAuthorByFullName(bookData.author);
          setComms(bookData.comments);
          setRevs(bookData.reviews);
        } else {
          console.error("Failed to fetch book details with status: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching book data: ", error);
      }
    };

    getBookById();
  }, [id]); // Depend only on id

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  const handleCommentSubmit = async () => {
    if (!user?.id) {
      setErrorReview("You need to be logged in to use this option.");
      return;
    }
    await newComment();
    setCommentText('');
    setRating(0); // Reset rating after submitting
  };

  const handleReviewButtonClick = () => {
    if (!user) {
      setErrorReview("You need to be logged in to use this option."); 
    } else {
      setShowReviewList(true);
    }
  };

  const handleClickOutside = (event) => {
    if (reviewListRef.current && !reviewListRef.current.contains(event.target)) {
      setShowReviewList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDownload = () => {
    if (!user?.id) {
      setErrorDownload("You need to be logged in to use this option.");
      return;
    }
    if (pdfSrc) {
      window.open(pdfSrc);
    }
  };

  return (
    <div className="book-page">
      <div className="sidebar2">
        <div className="current-values">
          <div className="orange-block">
            {imageSrc && <img src={imageSrc} alt="Book Cover" className="book-cover" />}
          </div>
          <button className="review-button" onClick={handleReviewButtonClick}>Review</button>
          {errorReview && <p className="error-message">{errorReview}</p>}
        </div>
        <div className="add-to-list">
          <h3>Add this book to your list</h3>
          <button className="add-button" onClick={handleAddBook}>Add</button>
          {errorAdd && <p className="error-message">{errorAdd}</p>}
        </div>
        <div className="download-section">
          <h3>Download the book here</h3>
          <button className="download-button" onClick={handleDownload}>Download</button>
          {errorDownload && <p className="error-message">{errorDownload}</p>}
        </div>
      </div>

      <div className="book-container">
        {book && (
          <>
            <div className="book-header">
              <h1 className="title">{book.name}</h1>
              <h2 className="author">
                {authorId ? (
                  <Link to={`/author/${authorId}`} className="author-link">{book.author}</Link>
                ) : (
                  <span>{book.author}</span>
                )}
              </h2>
            </div>

            <p className="description">{book.description}</p>
            <div className="additional-details">
              <p>Publisher: {book.publisher}</p>
              <p>Genre: {book.genre}</p>
            </div>

            <div className="comment-section">
              <div className="form-group">
                <label htmlFor="commentText">Comment:</label>
                <textarea id="commentText" name="commentText" value={commentText} onChange={(e) => setCommentText(e.target.value)} rows="4" cols="50"></textarea>
              </div>
              <div className="form-group">
                <label>Overall Rating (1-10):</label>
                <ReactStars
                  key={`stars-${rating}`} // Add a key prop to force re-render
                  count={10}
                  onChange={setRating}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Bind the value to the state
                />
              </div>
              <button type="button" onClick={handleCommentSubmit}>Submit Comment</button>
            </div>

            <CommentList comments={comms} />
          </>
        )}
      </div>

      {showReviewList && (
        <div className="review-list-overlay">
          <div className="review-list-container" ref={reviewListRef}>
            <ReviewList initialReviews={revs} id={id}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;