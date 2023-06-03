import { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function ApartmentAddForm() {
    const [data, setData] = useState(false);
    const refForm = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries([...new FormData(refForm.current).entries()]);
        console.log(data)

        // axios.post('/api/customers', data)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        const response = await fetch('api/apartments/edit', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            setData(true);
            refForm.current.reset();
        } else {

            console.log(response)
        }
    }

    return (
    <>
    {data && <p>successs</p>}
        <form onSubmit={handleSubmit} ref={refForm}>
            <label htmlFor="address">Address</label>
            <input type="text" id='address' name="address" required></input>
            <br></br>
            <label htmlFor="isActive">isActive</label>
            <input type="checkbox" id="isActive" name="isActive" value={true}></input>
            <br></br>
            <label htmlFor="isOccupied">isOccupied</label>
            <input type="checkbox" id="isOccupied" name="isOccupied" value={true}></input>
            <br></br>
            <label htmlFor="floor">Floor</label>
            <input type="number" id="floor" name="floor" required min={1}></input>
            <br></br>
            <label htmlFor="floorQty">floorQty</label>
            <input type="number" id="floorQty" name="floorQty" required min={1}></input>
            <br></br>
            <label htmlFor="priceMonth">priceMonth</label>
            <input type="number" id='priceMonth' name="priceMonth" required min={0} step={100}></input>
            <br></br>
            <label htmlFor="rooms">rooms</label>
            <input type="number" id="rooms" name="rooms" required min={1}></input>
            <br></br>
            <button type="submit" style={{"background": "green"}}>Add Apartment</button>
        </form>
    </>
    )
}

export default ApartmentAddForm
