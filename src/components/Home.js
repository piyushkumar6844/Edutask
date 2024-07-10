import React ,{useContext} from 'react';
import Notes from './Notes';
import HomeworkContext from '../context/HomeworkContext';
import Submissions from './submissions';
 const Home = () => {
    const { user} = useContext(HomeworkContext);

    return (
        <div> 
            
 {user && user.role === 'teacher' && <Submissions />}
 {user && user.role === 'student' && <Notes/>}
        </div>
    )
}
export default Home;