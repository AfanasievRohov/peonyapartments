import React from 'react';
import { useState } from 'react';
import Logout from './Logout';
import { useGlobalContext } from './AppContext';

function TestComponent() {
    let [heading, setHeading] = useState(null);
    const user = useGlobalContext();
    console.log(user)

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
