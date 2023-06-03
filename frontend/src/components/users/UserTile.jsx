import { useDispatch } from "react-redux"
import { deleteUser } from "../../features/users/usersSlice";

function UserTile({_id, index, phoneNumber}) {
    const dispatch = useDispatch();

    return (
        <div>
            <p>#{index}</p>
            <p>{phoneNumber}</p>
            <button onClick={() => dispatch(deleteUser(_id))}>Delete phone number</button>
        </div>
    )
}

export default UserTile
