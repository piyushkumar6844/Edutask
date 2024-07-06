import React, { useState, useContext, useEffect } from 'react';
import HomeworkContext from '../context/HomeworkContext';
import { useNavigate } from 'react-router-dom';
//import Teachernote from './Submissions';
const AddHomework = () => {
  const { homeworks, fetchHomeworks,fetchSubmissions,home } = useContext(HomeworkContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchHomeworks();
    } else {

      navigate('/login');
    }
  }, []);


  const context = useContext(HomeworkContext);
  const { addHomework } = context;
  let navigate = useNavigate();
  const [homework, setHomework] = useState({ title: "", description: "", dueDate: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    addHomework(homework.title, homework.description, homework.dueDate);
    setHomework({ title: "", description: "", dueDate: "" });
  };
  


  const onChange = (e) => {
    setHomework({ ...homework, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="container my-5">
      <h2>Add Homework</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={homework.title} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={homework.description} onChange={onChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input type="date" className="form-control" id="dueDate" name="dueDate" value={homework.dueDate} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary ">Add Homework</button>
        {/* <button onClick={handleuser} type="submit" className="btn btn-primary mx-5">Add Homework</button> */}
        </form>

    </div>
    <div className="container my-20">
      {/* <Teachernote/> */}
      </div>  

</>
);
};

export default AddHomework;
