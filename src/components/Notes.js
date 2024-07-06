import React, { useContext, useEffect, useState } from 'react';
import HomeworkContext from '../context/HomeworkContext';
import AddHomework from './AddHomework';
import { useNavigate } from 'react-router-dom';
import Submissions from './submissions';

const Notes = () => {
  const { homeworks, fetchHomeworks, user, submitHomework } = useContext(HomeworkContext);
  const navigate = useNavigate();
  const [contentMap, setContentMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchHomeworks();
    } else {

      navigate('/login');
    }
  }, []);

  const handleSubmit = async (event, homeworkId) => {
    event.preventDefault();
    setError(null);

    try {
      await submitHomework(homeworkId, contentMap[homeworkId]);
      setContentMap((prevContentMap) => ({
        ...prevContentMap,
        [homeworkId]: '' // Reset content after successful submission
      }));
      alert('Homework submitted successfully');
    } catch (err) {
      setError('Failed to submit homework. Please try again.');
    }
  };

  const handleChange = (event, homeworkId) => {
    const { value } = event.target;
    setContentMap((prevContentMap) => ({
      ...prevContentMap,
      [homeworkId]: value
    }));
  };

  return (
    <>
      {user && user.role === 'teacher' && <Submissions />  }
      <div className="container my-3">
        
        <div className="row">
        {user &&  user.role === 'student' && <h2>{user.name}'s Homeworks</h2>}
          {user &&  user.role === 'student' && homeworks.map((homework) => (
            
            <div key={homework._id} className="col-md-3 ">
              
              <div className="card my-3 card text-bg-light mb-3  "  >
                <div className="card-body ">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title">{homework.title}</h5>
                    {/* You can add edit and delete icons here if needed */}
                  </div>
                  <p className="card-text">{homework.description}</p>
                  <form onSubmit={(e) => handleSubmit(e, homework._id)}>
                    <div className="form-group">
                      <label htmlFor={`submission-${homework._id}`}>Your Submission:</label>
                      <textarea
                        id={`submission-${homework._id}`}
                        className="form-control"
                        value={contentMap[homework._id] || ''}
                        onChange={(e) => handleChange(e, homework._id)}
                        rows="3"
                      />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
