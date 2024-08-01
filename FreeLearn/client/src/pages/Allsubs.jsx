import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer,PdfComp } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useOutletContext } from 'react-router-dom';
// import { pdfjs } from 'react-pdf';
import { useState } from 'react';
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';  
//import { pdfjs } from 'react-pdf';
// import 'pdfjs-dist/build/pdf.worker.entry';  // Correct worker import
// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
// pdfjs.GlobalWorkerOptions.workerSrc =
//   'https://unpkg.com/pdfjs-dist@3.7.0/build/pdf.worker.min.js';
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();

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
  const [show,setshow]=useState(true);
  const [pdf,setpdf]=useState("");

  // const getpdf = () => {
  //   window.open(
  //     `http://localhost:5100/files/172236619068801Insert.pdf`,
  //     '_blank',
  //     'noreferrer'
  //   );
  // };
  return (
    <AllJobsContext.Provider value={{ show, pdf, setpdf, setshow }}>
      <SearchContainer />
      <JobsContainer content={data} user={user}/>
      {/* {show&& <PdfComp pdf={pdf}/>} */}
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);

export default Allsubs;
