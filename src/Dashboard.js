import React from 'react';
import './App.css';
import './Dashboard.css';
import ZForm from './ZForm';
import ZButton from './ZButton';
import ZSideNav from './ZSideNav';
import ZStudentTable from './ZStudentTable';
import ZFooter from './ZFooter';

function Dashboard() {
  return (
    <div>
      <ZSideNav />
      <section className='flex-children'>
        <h1>Hellllo zertify!</h1>
        <h2>Student Table</h2>
        <ZStudentTable />
        <h2>Form</h2>
        <ZForm />
        <h2>Template</h2>
        <ZButton />
      </section>
      <ZFooter />
    </div>
  );
}

export default Dashboard;
