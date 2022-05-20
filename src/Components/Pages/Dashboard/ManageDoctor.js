import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import DeleteDoctorModal from './DeleteDoctorModal';

const ManageDoctor = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
    const {data: doctor, isLoading, refetch} = useQuery("doctor", ()=> fetch('https://desolate-castle-78820.herokuapp.com/doctor', {
        method: 'GET',
        headers: {
            authorization : `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then(res=> res.json()))


    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-2xl text-secondary my-4'>Doctors List: {doctor?.length}</h1>
            <div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
        <th>S/L</th>
        <th>Profile</th>
        <th>Name</th>
        <th>Speciality</th>
        <th>Resign</th>
      </tr>
    </thead>
    <tbody>
        {
            doctor.map((d, index)=> <tr>
                <th>{index + 1}</th>
                <td>
                <div class="avatar">
  <div class="w-8 rounded">
    <img src={d.img} alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>
                </td>
                <td>{d.name}</td>
                <td>{d.speciality}</td>
                <td>{
                  
                <label for="delete-doctor-confirmation" onClick={()=>setDeletingDoctor(d)} class="btn btn-xs btn-error">Delete</label>
                
                }</td>
              </tr>)
        }
      
    </tbody>
  </table>
  {
    deletingDoctor && <DeleteDoctorModal doctor={deletingDoctor} refetch={refetch} setDeletingDoctor={setDeletingDoctor}></DeleteDoctorModal>
  }
</div>
        </div>
    );
};

export default ManageDoctor;