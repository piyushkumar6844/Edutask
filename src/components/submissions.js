import React, { useState, useContext, useEffect } from 'react';
import HomeworkContext from '../context/HomeworkContext';
import { useNavigate } from 'react-router-dom';
import AddHomework from './AddHomework';

const Submissions = () => {
  const navigate = useNavigate();
  const { homeworks, fetchHomeworks, fetchSubmissions } = useContext(HomeworkContext);
  const [submissionsMap, setSubmissionsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        await fetchHomeworks();
      } catch (error) {
        setError('Error fetching homeworks');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchHomeworks, navigate]);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      if (homeworks.length > 0) {
        try {
          const promises = homeworks.map(async (homework) => {
            const submissions = await fetchSubmissions(homework._id);
            return { homeworkId: homework._id, submissions };
          });

          const submissionsArray = await Promise.all(promises);
          const submissionsMap = submissionsArray.reduce((acc, { homeworkId, submissions }) => {
            acc[homeworkId] = submissions;
            return acc;
          }, {});

          setSubmissionsMap(submissionsMap);
        } catch (error) {
          setError('Error fetching submissions');
        }
      }
    };

    fetchAllSubmissions(); // Initial fetch

    // Cleanup function to avoid memory leaks or unnecessary fetching
    return () => {
      // Optionally, you can abort ongoing fetch requests here if using fetch with AbortController
    };
  }, [homeworks, fetchSubmissions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    
    <div className="container my-5">
     <AddHomework/>
      <h2>All Homework Submissions</h2>

      {homeworks.map((homework) => (



        <div key={homework._id} className="homework-box">
          <h3>{homework.title}</h3>
          {submissionsMap[homework._id]?.map((submission) => (
            <div className="container my-3">
        
        <div className="row">
        
        
                      <div className="card my-3 card text-bg-light mb-3"  >
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                    <div className="col-md-3">





            <div key={submission._id} className="submission-box ">
              <p>Submission ID: {submission._id}</p>
              <p>Submitted by: {submission.student.name} ({submission.student.email})</p>
              <p>Submission Date: {new Date(submission.submissionDate).toLocaleString()}</p>
              <p>Content: {submission.content}</p>
            </div>
            
            
            </div>
          </div>
        </div>
        </div>
        </div>
</div>


          ))}
          {(!submissionsMap[homework._id] || submissionsMap[homework._id].length === 0) && (
            <p>No submissions found for this homework.</p>
          )}







    </div>
      ))}
    </div>

    
  );
};

export default Submissions;
