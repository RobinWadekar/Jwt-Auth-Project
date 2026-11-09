import React, { useState } from 'react'
import CheckEndpoint from './CheckEndpoint';

const Home = () => {

    return (
        <div>
            <h1>JWT Auth Bearer Token</h1>
            <h3>A React frontend built by <u>Robin Wadekar</u>, designed to consume and demonstrate a JWT-secured backend. This client handles all API endpoints, including registration and protected, role-based pages (/ceo-page, /hr-page, etc.)</h3>
            <h4>This project serves as the React client for the JWT Auth backend. It provides a complete frontend interface for all endpoints, including /registerEmployee and all protected, role-specific routes.</h4>
            <br />
            <br />
            <CheckEndpoint />
        </div>
    )
}

export default Home
