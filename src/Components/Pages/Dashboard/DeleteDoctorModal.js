import React from 'react';
import { toast } from 'react-toastify';

const DeleteDoctorModal = ({doctor, refetch, setDeletingDoctor}) => {
    const handleDelete = email => {
        fetch(`http://localhost:5000/doctor/${email}`, {
            method: "DELETE",
            headers: {
                authorization : `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(email)
        })
        .then(res=> res.json())
        .then(data=> {
            toast.success("Delete")
            setDeletingDoctor(null)
            refetch();
        })
    }
    
    return (
        <div>

<input type="checkbox" id="delete-doctor-confirmation" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg text-red-400">Are you sure want to delete Dr. {doctor.name}?</h3>
    <p class="py-4">If you press Delete button. Doctor information will remove form whole DB.</p>
    <div class="flex justify-between">
        <button className='btn' onClick={()=>handleDelete(doctor.email)}>Delete</button>
      <label for="delete-doctor-confirmation" class="btn">Close</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default DeleteDoctorModal;