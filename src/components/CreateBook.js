import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateBook.css';

const CreateBook = () => {
    const [book, setBook] = useState({
        name: '',
        description: '',
        author: '',
        published: '',
        publisher: '',
        imageURL: '',
        fileURL: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');

    const createNewBook = async (bookData) => {
        try {
            const formData = new FormData();
            for (const key in bookData) {
                formData.append(key, bookData[key]);
            }
            if (imageFile) {
                formData.append("ImageFile", imageFile);
            }
    
            const response = await axios.post('http://libraryandarchive.somee.com/api/Books/createBook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Book created:', response.data);
            setSubmissionStatus('Book created successfully!');
        } catch (error) {
            console.error('Error creating book:', error);
            setSubmissionStatus('Error creating book. Please try again.');
        }
    };

      const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setImageFile(files[0]);
        } else {
            setBook({ ...book, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        // Validate each field
        if (!book.name) validationErrors.name = 'Name is required';
        if (!book.description) validationErrors.description = 'Description is required';
        if (!book.author) validationErrors.author = 'Author is required';
        if (!book.published) validationErrors.published = 'Published date is required';
        if (!book.publisher) validationErrors.publisher = 'Publisher is required';
        if (!book.imageURL) {
            validationErrors.imageURL = 'Image URL is required';
        } else if (!book.imageURL.endsWith('.jpg')) {
            validationErrors.imageURL = 'Image URL must end with .jpg';
        }
        if (!book.fileURL) {
            validationErrors.fileURL = 'File URL is required';
        } else if (!book.fileURL.endsWith('.pdf')) {
            validationErrors.fileURL = 'File URL must end with .pdf';
        }

        setErrors(validationErrors);

        // If there are no errors, you can proceed with form submission or further processing
        if (Object.keys(validationErrors).length === 0) {
            const bookData = {
                name: book.name,
                description: book.description,
                author: book.author,
                published: book.published,
                publisher: book.publisher,
                genre: book.genre,
                imageURL: book.imageURL,
                fileURL: book.fileURL,
                comments: [], // Keep comments empty as per the requirements
                reviews: []  // Keep reviews empty as per the requirements
              };
              createNewBook(bookData);
        }
    };

    return (
        <div className="create-book-container">
            <h2>Create Book</h2>
            <form className="create-book-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={book.name} onChange={handleChange} />
                {errors.name && <div className="error">{errors.name}</div>}

                <label>Description</label>
                <textarea name="description" value={book.description} onChange={handleChange}></textarea>
                {errors.description && <div className="error">{errors.description}</div>}

                <label>Author</label>
                <input type="text" name="author" value={book.author} onChange={handleChange} />
                {errors.author && <div className="error">{errors.author}</div>}

                <label>Published</label>
                <input type="date" name="published" value={book.published} onChange={handleChange} />
                {errors.published && <div className="error">{errors.published}</div>}

                <label>Publisher</label>
                <input type="text" name="publisher" value={book.publisher} onChange={handleChange} />
                {errors.publisher && <div className="error">{errors.publisher}</div>}

                <label>Genre</label>
                <select name="genre" value={book.genre} onChange={handleChange}>
                    <option value="">Select a genre</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                </select>

                <label>ImageURL</label>
                <input type="text" name="imageURL" value={book.imageURL} onChange={handleChange} />
                {errors.imageURL && <div className="error">{errors.imageURL}</div>}

                <label>FileURL</label>
                <input type="text" name="fileURL" value={book.fileURL} onChange={handleChange} />
                {errors.fileURL && <div className="error">{errors.fileURL}</div>}

                <button type="submit">Create Book</button>
            </form>
            {submissionStatus && <div className="submission-status">{submissionStatus}</div>} {/* Display submission status */}
        </div>
    );
};

export default CreateBook;