import React from 'react'

export const apiClient = async (api, token) => {
    try {
        const response = await fetch(`/${api}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.text();
        // setMessage(data);
        return data;
    } catch (error) {
        console.log("\n\nError details : ", error);
    }
}
