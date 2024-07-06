import React, { useState, useEffect, useContext } from 'react';
import HomeworkContext from './HomeworkContext';

const HomeworkState = (props) => {
  const host = "http://localhost:8000";
  const [homeworks, setHomeworks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState([]);
  const [user, setUser] = useState(null);
  const [homework, setHomework] = useState([]);
  const [home, setHome] = useState([]);
  // Fetch user details
  const getUser = async () => {
    try {
      //console.log('Tokenvljndlk:', localStorage.getItem('token'));


      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const userData = await response.json();
      
       setUser(userData);
      console.log('User data:', userData);
      if (userData && userData.role) {
        // Access role here
        console.log('User Role:', userData.role);
        // Proceed with setting user state or other operations
      }

      else {
        throw new Error('User data or role not available');
      }






      

      

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
  }, []);











// to submit homework
const submitHomework = async (homeworkId, content) => {
  try {
    // API Call
    const response = await fetch(`${host}/api/homework/submit/${homeworkId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      throw new Error('Failed to submit homework');
    }



    const newHomework = await response.json();
    setHomework((prevHomeworks) => 
      prevHomeworks.map(h => h._id === homeworkId ? newHomework : h)
    );
  } catch (error) {
    console.error('Error submitting homework:', error);
  }



  } ;






  // Fetch all homeworks
  const fetchHomeworks = async () => {
    try {
      const response = await fetch(`${host}/api/homework/fetchallhomework`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch homeworks');
      }

      const data = await response.json();
      setHomeworks(data);
    } catch (error) {
      console.error('Error fetching homeworks:', error);
    }
  };

  // Fetch submissions for a specific homework
  const fetchSubmissions = async (homeworkId) => {
    try {
      const response = await fetch(`${host}/api/homework/submissions/${homeworkId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch submissions: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  };
  

  // Grade a submission
  const gradeSubmission = async (submissionId, grade) => {
    try {
      const response = await fetch(`${host}/api/homework/grade/${submissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ grade })
      });

      if (!response.ok) {
        throw new Error('Failed to grade submission');
      }

      const updatedSubmission = await response.json();
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission._id === submissionId ? updatedSubmission : submission
        )
      );
    } catch (error) {
      console.error('Error grading submission:', error);
    }
  };

  // Add a new homework
  const addHomework = async (title, description, dueDate) => {
    try {
      const response = await fetch(`${host}/api/homework/addhomework`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, dueDate })
      });

      if (!response.ok) {
        throw new Error('Failed to add homework');
      }

      const newHomework = await response.json();
      setHomeworks((prevHomeworks) => [...prevHomeworks, newHomework]);
    } catch (error) {
      console.error('Error adding homework:', error);
    }
  };

  return (
    <HomeworkContext.Provider value={{ homework,homeworks, submissions, grades, user,home, fetchHomeworks, fetchSubmissions, gradeSubmission, addHomework, getUser,submitHomework }}>
      {props.children}
    </HomeworkContext.Provider>
  );
};

export default HomeworkState;
