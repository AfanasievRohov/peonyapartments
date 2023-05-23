import React from 'react';
import { useState } from 'react';
import Logout from './authorization/Logout';

function TestComponent() {
    let [heading, setHeading] = useState(null);

    React.useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api");
            console.log(res)
            const data = await res.json();
            console.log(data)
            setHeading(data);
        }
        getData();
    }, [])
    return (
        <h1>
            {heading && heading.data}
            <Logout />
        </h1>
    )
}

export default TestComponent
