import { useState } from "react"
import { deleteCustomerNote, updateCustomerNote } from "../../features/customers/customersSlice";
import { useDispatch, useSelector } from "react-redux";

function CustomersNotes({index, name, phoneNumber, note, _id}) {
    const [isUpdated, setUpdate] = useState(false);
    const [nameValue, setName] = useState(name);
    const [phoneNumberValue, setPhoneNumber] = useState(phoneNumber);
    const [noteValue, setNote] = useState(note);
    const dispatch = useDispatch();

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setUpdate(true)
    }

  return (
    <div>
      <p>#{index}</p>
      <input value={nameValue} onChange={(e) => handleChange(e, setName)}></input>
      <input value={phoneNumberValue} onChange={(e) => handleChange(e, setPhoneNumber)}></input>
      <input value={noteValue} onChange={(e) => handleChange(e, setNote)}></input>
      {isUpdated ? <button onClick={() => dispatch(updateCustomerNote({_id: _id, name: nameValue, phoneNumber: phoneNumberValue, note: noteValue}))}>Update note</button> : <button onClick={() => dispatch(deleteCustomerNote(_id))}>Delete note</button> }
    </div>
  )
}

export default CustomersNotes
