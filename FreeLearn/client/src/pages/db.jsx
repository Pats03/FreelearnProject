import { toast } from 'react-toastify';
import { JobsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';

export const loader = async () => {
  try {
    const { data } = await customFetch('/teacher/recentcontent');
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Wrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const WelcomeMessage = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 2.5em;
  color: #031B29; /* Neutral highlight color */
`;

const Quote = styled.p`
  font-family: 'Courier New', Courier, monospace,bold;
  font-size: 1.5em;
  color: #031b29; /* Neutral secondary text color */
  margin: 20px 0;
`;

const Timer = styled.h2`
  font-family: 'Verdana', sans-serif;
  font-size: 1.8em;
  color: #031b29; /* Neutral text color */
`;

const Section = styled.div`
border: 2cap;
 
`;

const SectionTitle = styled.h3`
  font-family: 'Tahoma', sans-serif;
  font-size: 2em;
  color: black; /* Red text color */
  margin-bottom: 0.5; /* Reduce gap */
`;

const TaskCount = styled.p`
  font-family: 'Tahoma', sans-serif;
  font-size: 1.2em;
  color: #114e73; /* Neutral tertiary text color */
`;

const JobsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Db = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { user, verifiedMediaCount, uploadedCount } = useOutletContext();
  const { data } = useLoaderData();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Mock data for tasks (you can replace this with real data fetching)

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <WelcomeMessage>Welcome {user.name} !!!</WelcomeMessage>
      <Quote>
        "The best teachers teach from the heart, not from the book." - Unknown
      </Quote>
      {/* <Timer>Current Time: {time}</Timer> */}
      <Section>
        {/* <SectionTitle>Tasks Overview</SectionTitle>
        <br />
        <TaskCount>Uploaded Tasks:{uploadedCount}</TaskCount>
       
        <br />
        <TaskCount>Verified Tasks: {verifiedMediaCount}</TaskCount> */}
        {/* {show&& <PdfComp pdf={pdf}/>} */}
        <SectionTitle>Recent Uploads</SectionTitle>
        <JobsContainer content={data} user={user} />
      </Section>
    </Wrapper>
  );
};

export default Db;
