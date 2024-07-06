import React, { useState, useContext } from 'react';
import HomeworkContext from '../context/HomeworkContext';

// const HomeworkItem = (props) => {
  
//   const context = useContext(HomeworkContext);
//   const { homework, key } = props;
  //const { submitHomework } = context;
  //const [content, setContent] = useState('');
  ///const [error, setError] = useState(null);

  // const handleChange = (event) => {
  //   setContent(event.target.value);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setError(null);
  //   {console.log("iefniernfinerfie")}
  //   try {
  //     await submitHomework(homework._id, content);
  //     setContent('');
  //     alert('Homework submitted successfully');
  //   } catch (err) {
  //     setError('Failed to submit homework. Please try again.');
  //   }
  // };

  // return (
  //   <div className="col-md-3">
  //     <div className="card my-3">
  //       <div className="card-body">
  //         <h5 className="card-title">{homework.title}</h5>
  //         <p className="card-text">{homework.description}</p>
  //         <p className="card-text"><small className="text-muted">Due: {new Date(homework.dueDate).toDateString()}</small></p>
{/*           
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor={`submission-${key}`}>Your Submission:</label>
              <textarea 
                id={`submission-${homework._id}`} 
                className="form-control" 
                value={content} 
                onChange={handleChange} 
                rows="3"
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </form> */}
//         </div>
//       </div>
//     </div>
//   );
// };



const HomeworkItem = (props) => {
    const context = useContext(HomeworkContext);
    //const { deleteNote } = context;
    const { key, homework } = props;
    {console.log("iefniernfinerfie",key)}
    return (
      
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{homework.title}</h5>
                        {/* <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i> */}
                        {/* <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i> */}
                    </div>
                    <p className="card-text">{homework.description}</p>

                </div>
            </div>
        </div>
    
    )
}

export default HomeworkItem;
