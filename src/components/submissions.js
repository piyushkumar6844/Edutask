
import React, { useState, useContext, useEffect } from 'react';
import HomeworkContext from '../context/HomeworkContext';
import { useNavigate } from 'react-router-dom';
import AddHomework from './AddHomework';

const Submissions = () => {
  const navigate = useNavigate();
  const { homeworks, fetchHomeworks, fetchSubmissions, gradeSubmission } = useContext(HomeworkContext);
  const [submissionsMap, setSubmissionsMap] = useState({});
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, homeworkId, submissionId) => {
    e.preventDefault();
    const marksValue = marks[submissionId];
    const marksNumber = Number(marksValue)
    if (isNaN(marksNumber)) {
      console.error('Marks should be a number');
      return;
    }
    console.log(`Submitting marks: ${marksNumber}`); // Log the marks value
    try {
      await gradeSubmission(homeworkId, submissionId, marksNumber);
      console.log('Grade submitted successfully');
      // Optionally, handle success feedback (e.g., display a success message or clear the form)
    } catch (error) {
      console.error('Error submitting grade:', error);
      // Optionally, handle error feedback (e.g., display an error message)
    }
  };

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
      <AddHomework />
      <h2>All Homework Submissions</h2>

      {homeworks.map((homework) => (
        <div key={homework._id} className="homework-box">
          <h3>{homework.title}</h3>
          {submissionsMap[homework._id]?.map((submission) => (
            <div key={submission._id} className="submission-box">
              <p>Submission ID: {submission._id}</p>
              {/* <p>Submitted by: {submission.student.name} ({submission.student.email})</p> */}
              <p>Submission Date: {new Date(submission.submissionDate).toLocaleString()}</p>
              <p>Content: {submission.content}</p>
              <form onSubmit={(e) => handleSubmit(e, homework._id, submission._id)}>
                <div className="mb-3">
                  <label htmlFor={`marks-${submission._id}`} className="form-label">Marks {submission.marks || 0}</label>
                  <input
                    type="number"
                    className="form-control"
                    id={`marks-${submission._id}`}
                    name={submission._id}
                    value={marks[submission._id] || ''}
                    onChange={onChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {/* <p>Marks:</p> */}
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
