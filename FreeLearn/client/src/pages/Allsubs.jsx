import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useOutletContext } from 'react-router-dom';
export const loader = async () => {
  try {
    const { data } = await customFetch('/teacher/teachercontent');
    return {data};
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllJobsContext = createContext();
const Allsubs = () => {
  const { data} = useLoaderData();
  const { user} = useOutletContext();

  // const getpdf = () => {
  //   window.open(
  //     `http://localhost:5100/files/172236619068801Insert.pdf`,
  //     '_blank',
  //     'noreferrer'
  //   );
  // };
  return (
    <AllJobsContext.Provider value={{ data,user }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);

export default Allsubs;
