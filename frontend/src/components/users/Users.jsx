import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../features/users/usersSlice";
import UserTile from "./UserTile";
import UserPhoneAddForm from "./UserPhoneAddForm";

function Customers() {
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector(store => store.users);

    useEffect(()=> {
        dispatch(getAllUsers());
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <UserPhoneAddForm />
            {users.map((elem, index) => <UserTile key={elem._id} index={index + 1} {...elem} />)}
        </div>
    )
}

export default Customers
