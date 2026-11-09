import React from 'react'

export const getEmpByUsername = async (userName, token) => {
    try {
        const response = await fetch(`/getEmpByUsername/${userName}`,{
            method: 'GET',
            headers: {
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("\n\nAn error occurred. Here are the details : ", error);
    }
}
