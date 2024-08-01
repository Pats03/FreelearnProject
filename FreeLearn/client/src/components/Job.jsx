import { FaLocationArrow,FaFilePdf, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useAllJobsContext } from '../pages/Allsubs';
import styled from 'styled-components';
import { useState } from 'react';
day.extend(advancedFormat);

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 10px; /* Reduced horizontal padding */
  border: 1px solid #0b0707;
  border-radius: 4px;
  background-color: #e0e0e0;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: auto; /* Adjust width as needed */
  max-width: 100px; /* Limit width if necessary */

  &:hover {
    background-color: #4f1e93;
  }
`;

const Job = ({ _id, file, teacher, topics, createdAt, verified , user}) => {
  const date = day(createdAt).format('MMM Do, YYYY');
  const chapter = topics?.Chapter;
  const subject = chapter?.subject;
  const standard = subject?.standard?.standard;
  //const user=props.user;
  //console.log(user);
  //const { user} = useAllJobsContext();
   const showPdf = () => {
     // Logic to handle PDF download
    window.open(`http://localhost:5100/files/${file}`, '_blank', 'noreferrer');
    // setpdf(`http://localhost:5100/files/${file}`);
    // setshow(true);
    
    

   };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{standard}</div>
        <div className="info">
          <h5>{chapter?.name}</h5>
          <p>{topics?.name}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <Button onClick={showPdf}>
            <JobInfo icon={<FaFilePdf />} text="pdf" />
          </Button>
          <JobInfo icon={<FaBriefcase />} text={teacher.name} />
          <div className={`status ${verified}`}>
            {verified ? 'Verified' : 'Not Verified'}
          </div>
        </div>

        <footer className="actions">
          {user.role === 'admin' && (
            <Link to={`/dashboard/edit-content/${_id}`} className="btn edit-btn">
              Edit
            </Link>
          )}
          {user.role === 'legend' && (
            <>
              <Link to={`../edit-content/${_id}`} className="btn edit-btn">
                Edit
              </Link>
              <Form method="post" action={`../delete-content/${_id}`}>
                <button type="submit" className="btn delete-btn">
                  Delete
                </button>
              </Form>
            </>
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
