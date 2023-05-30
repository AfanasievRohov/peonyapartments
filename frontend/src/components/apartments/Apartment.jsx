import React from 'react'

function Apartment({isOccupied, address, floor, floorQty, priceMonth, rooms, index}) {
    return (
        <article className='apartment-block'>
            <div><p>#{index}</p><p>{isOccupied ? "Available" : "Occupied"}</p></div>
            <div><p>Address:</p><p>{address}</p></div>
            <div><p>Floor:</p><p>{floor}/{floorQty}</p></div>
            <div><p>Price:</p><p>{priceMonth}</p></div>
            <div><p>Rooms:</p><p>{rooms}</p></div>
            <button>Details</button>
        </article>
    )
}

export default Apartment
