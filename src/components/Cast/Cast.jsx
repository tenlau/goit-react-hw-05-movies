import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMovieCast } from '../../services/tmdbAPI';
import { useParams } from 'react-router-dom';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId).then(setCast);
  }, [movieId]);

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map(member => (
          <li key={member.id} className={styles.castItem}>
            {member.profile_path && (
              <img
                className={styles.castImage}
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
              />
            )}
            <div>
              <p className={styles.castName}>{member.name}</p>
              <p className={styles.castCharacter}>Character: {member.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    })
  ),
};

export default Cast;
