import React from 'react'

export const getListOfEmpsAccToRole = async (role, token) => {
    try {
        const response = await fetch(`/getAllEmpsByRole/${role}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("\n\nAn error occurred. Here are the details : ", error);
    }
}