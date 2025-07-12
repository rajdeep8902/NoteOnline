import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged in successfully","success")
        }
        else {
            props.showAlert("Invalid credentials","danger")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control my-2" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control my-2" id="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary my-1">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
