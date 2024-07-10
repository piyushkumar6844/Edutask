import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(" http://localhost:9000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/home");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Error logging in. Please try again later.");
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };
    const handle=()=>{
        window.location.reload();
    };

    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <button  type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
