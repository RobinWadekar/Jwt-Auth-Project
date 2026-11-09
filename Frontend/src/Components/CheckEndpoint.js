import React, { useState } from 'react'
import EndpointsList from './EndpointsList';

const CheckEndpoint = () => {

    const [serverMsg, setServerMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/check');
            if(!response.ok) {
                throw new Error(`HTTP error! Status : ${response.status}`);
            }
            const data = await response.text();
            console.log(data);
            setServerMsg(data);
        } catch (error) {
            console.error('There\'s an error with the server');
            console.log("\n\n\n",error);
            setServerMsg("Server is not up and running at the moment, please look into it or try after some time.");
        }
    };

    return (
        <div className='transparent-div'>
            Let's check if the backend server is up and running?
            <br />
            {(serverMsg) ?
                (serverMsg === "Server is not up and running at the moment, please look into it or try after some time.") ?
                    <>
                        <button onClick={handleSubmit} type='submit'>What does backend server say?</button>
                        <br />
                        {serverMsg}
                    </>
                    :
                    <>
                        <strong>{serverMsg}</strong>
                        <br />
                        <br />
                        Now, let's check all the other endpoint.
                        <br />
                        <EndpointsList />
                    </>
                :
                <button onClick={handleSubmit} type='submit'>What does your backend server say?</button>
            }
        </div>
    )
}

export default CheckEndpoint
