import React, { useState, useEffect } from 'react';
import { getMovieDetails } from '../../services/tmdbAPI';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* Navigation Links for Home and Movies */}
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link> | 
        <Link to="/movies" className={styles.navLink}>Movies</Link>
      </div>

      <hr className={styles.topLine} /> {/* Line after Home/Movies links */}
      
      {/* Go Back Link with Arrow */}
      <div className={styles.goBackWrapper}>
        <button onClick={() => navigate(-1)} className={styles.goBackButton}>
          <span className={styles.arrow}>&larr;</span> Go Back
        </button>
      </div>

      {/* Movie Details */}
      <div className={styles.movieDetails}>
        {/* Movie Poster */}
        {movie.poster_path && (
          <img
            className={styles.moviePoster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <div className={styles.movieInfo}>
          {/* Title */}
          <h1 className={styles.title}>{movie.title}</h1>

          {/* User Score */}
          <p className={styles.userScore}>User Score: {(movie.vote_average * 10).toFixed(2)}%</p>

          {/* Overview */}
          <p className={styles.sectionTitle}>Overview</p> {/* Bold Overview label */}
          <p className={styles.overview}>{movie.overview}</p>

          {/* Genres */}
          <p className={styles.sectionTitle}>Genres</p> {/* Bold Genres label */}
          <p className={styles.genres}>
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <hr className={styles.bottomLine} /> {/* Line below movie poster */}

      {/* Additional Information */}
      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul className={styles.infoList}>
          <li>
            <Link to={`/movies/${movieId}/cast`} className={styles.link}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} className={styles.link}>Reviews</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
