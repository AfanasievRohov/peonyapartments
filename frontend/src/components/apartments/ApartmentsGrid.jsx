import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllApartments } from '../../features/apartments/apartmentsSlice';
import Apartment from './Apartment';


function ApartmentsGrid() {
    const dispatch = useDispatch();
    const {apartments, isLoading} = useSelector(state => state.apartments)

    useEffect(()=> {
        dispatch(getAllApartments())
    }, [])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            {apartments.map((elem, index) => <Apartment key={elem._id} index={index + 1} {...elem} />)}
        </section>
    )
}

export default ApartmentsGrid
