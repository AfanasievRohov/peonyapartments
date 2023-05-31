import React from 'react'
import styled from 'styled-components'

const ApartmentArticle = styled.article`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    margin: 2rem;
    padding: 2rem;
    border-radius: 2.5%;
    align-items: center;
    width: fit-content;
    padding: 0px 100px 0px 100px;
`

function Apartment({isOccupied, address, floor, floorQty, priceMonth, rooms, index}) {
    return (
        <ApartmentArticle className='apartment-block'>
            <div><p>#{index}</p><p>{isOccupied ? "Available" : "Occupied"}</p></div>
            <div><p>Address:</p><p>{address}</p></div>
            <div><p>Floor:</p><p>{floor}/{floorQty}</p></div>
            <div><p>Price:</p><p>{priceMonth}</p></div>
            <div><p>Rooms:</p><p>{rooms}</p></div>
            <button>Details</button>
        </ApartmentArticle>
    )
}

export default Apartment
