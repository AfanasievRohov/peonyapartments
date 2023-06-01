import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllCustomers } from "../../features/customers/customersSlice";
import CustomersAddForm from "./CustomersAddForm";
import CustomersNotes from "./CustomersNotes";

function Customers() {
    const dispatch = useDispatch();
    const { customers, isLoading } = useSelector(store => store.customers);

    useEffect(()=> {
        dispatch(getAllCustomers())
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <CustomersAddForm />
            {customers.map((elem, index) => <CustomersNotes key={elem._id} index={index + 1} {...elem} />)}
        </div>
    )
}

export default Customers
