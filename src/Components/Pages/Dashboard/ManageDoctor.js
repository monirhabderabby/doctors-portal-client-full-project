import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';

const ManageDoctor = () => {
    const {data: doctor, isLoading} = useQuery("doctor", ()=> fetch('https://desolate-castle-78820.herokuapp.com/doctor', {
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
                <td>{<button class="btn btn-xs">Remove</button>}</td>
              </tr>)
        }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageDoctor;