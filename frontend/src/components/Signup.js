import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account created successfully","success")
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
                        <label htmlFor="name">Username</label>
                        <input type="text" className="form-control my-2" id="name" name="name" placeholder="Enter Username" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control my-2" id="email" aria-describedby="emailHelp" placeholder="Enter Email" name="email" value={credentials.email} onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control my-2" id="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} minLength={5}/>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" className="form-control my-2" id="cpassword" placeholder="Password" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5}/>
                    </div>
                    <button type="submit" className="btn btn-primary my-1">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup
