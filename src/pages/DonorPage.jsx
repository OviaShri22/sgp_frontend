import React from 'react';
import RegisterComplaint from '../components/RegisterComplaint';
import StudentNavbar from '../components/StudentNavbar';

const DonorPage = () => {
  return (
    <div>
    <StudentNavbar />
    <div className="flex">
      <RegisterComplaint />
    </div>
    </div>
  );
};

export default DonorPage;
