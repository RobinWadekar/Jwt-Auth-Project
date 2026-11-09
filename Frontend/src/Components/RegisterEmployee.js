import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import '../index.css'
import { useAuth } from './AuthContext';

const RegisterEmployee = () => {

    const [employee, setEmployee] = useState({
        name: '',
        userName: '',
        password: '',
        role: 'Select'
    });

    // const [savedEmployee, setSavedEmployee] = useState({
    //     name: '',
    //     userName: '',
    //     password: '',
    //     role: '',
    //     token: ''
    // });

    const {user, setUser} = useAuth();

    // const [copied, setCopied] = React.useState(false);
    // const copyToken = async () => {
    //     // await navigator.clipboard.writeText(savedEmployee.token);
    //     await navigator.clipboard.writeText(user.token);
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 1500);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Your Data has been successfully saved");
        console.log("trying to post data into the backend now\n\n");
        try {
            const response = await fetch('/registerEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });
            
            if (response.status !== 201) {
                throw new Error(response.status);
            }
            
            const data = await response.json();
            // setSavedEmployee(data);
            setUser({
                name:data.name,
                userName:data.userName,
                password:'*'.repeat(employee.password.length),
                role:data.role,
                token:data.token
            });
            setEmployee({ name: '', userName: '', password: '', role: 'Select' });
        } catch (error) {
            console.log("\n\nAn error occurred. Here's a detailed look :\n", error, "\n\n");
        }
    };

    const handleChange = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    return (
        <div>
            <h3>Employee Registration Portal</h3>
            {/* {!savedEmployee.name ? */}
            {!user.name ?
                <form onSubmit={handleSubmit}>
                    <div className='register-box'>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                            <label style={{ minWidth: '100px' }}>Name : </label>
                            <input
                                type='text'
                                name='name'
                                value={employee.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                style={{ padding: '1px 8px', height: '25px', borderRadius: '8px', width: '300px', flex: 1 }}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                            <label style={{ minWidth: '100px' }}>Username : </label>
                            <input
                                type='text'
                                name='userName'
                                value={employee.userName}
                                onChange={handleChange}
                                placeholder="Your Username (should be unique)"
                                style={{ padding: '1px 8px', height: '25px', borderRadius: '8px', width: '300px', flex: 1 }}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                            <label style={{ minWidth: '100px' }}>Password : </label>
                            <input
                                type='password'
                                name='password'
                                value={employee.password}
                                onChange={handleChange}
                                placeholder="Your Password"
                                style={{ padding: '1px 8px', height: '25px', borderRadius: '8px', width: '300px', flex: 1 }} required
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                            <label style={{ minWidth: '100px' }}>Role : </label>
                            <select
                                name='role'
                                value={employee.role}
                                onChange={handleChange}
                                placeholder="Your Role"
                                style={{ padding: '1px 8px', height: '25px', borderRadius: '8px', width: '300px', flex: 1 }} required
                            >
                                <option value="Select" disabled>Select</option>
                                <option value="EMPLOYEE">Employee</option>
                                <option value="MANAGER">Manager</option>
                                <option value="HR">Human Resource</option>
                                <option value="CEO">CEO</option>
                            </select>
                        </div>

                        <button type="submit" onClick={handleSubmit} >Sign in</button>
                    </div>
                </form>
                :
                <div className='register-box' style={{ lineHeight: "1.8", fontSize: "15px" }}>
                    <strong>This is the data you saved :</strong>
                    <p>👤 <strong>Name:</strong> {user.name}</p>
                    <p>🆔 <strong>Username:</strong> {user.userName}</p>
                    <p>🔒 <strong>Password:</strong> {user.password}</p>
                    <p>🎯 <strong>Role:</strong> {user.role}</p>
                    <div className="token-row">
                        <strong>Token :</strong>
                        <span
                            className="token-text"
                            title={user.token}
                        >
                            {user.token}
                        </span>

                        <button
                            className="copy-btn"
                            onClick={() => navigator.clipboard.writeText(user.token)}
                            title="Copy"
                        >
                            🔗
                        </button>
                    </div>
                    <p className='pulse' style={{color:"red"}}>Disclaimer : You might want to copy that token. This token is only valid for 15 minutes. Thank you.</p>
                </div>

            }
            <br />
            <p className='register-box' style={{ fontSize: "medium", width: "500px", padding: "10px 0px" }}>
                If you want to go back to the Home page, click here <Link className='home-btn' to="/">Go back home</Link>
            </p>
        </div>
    )
}

export default RegisterEmployee
