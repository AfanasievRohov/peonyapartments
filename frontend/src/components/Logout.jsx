import React from 'react'

function Logout() {
    const handleLogout = async(event) => {
        event.preventDefault();

        const response = await fetch('/api/users/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST"
        });

        if (response.ok) {
            location.reload()
        } else {
            console.log(response)
        }
    }

    return (
        <div>
            <button onClick={handleLogout} style={{"background": "red"}} >Logout</button>
        </div>
    )
}

export default Logout
