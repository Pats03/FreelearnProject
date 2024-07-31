import { Formrow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useState } from 'react';

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [file, setFile] = useState("");
  const [classs, setclasss] = useState();
  const [subject, setsubject] = useState("");
  const [chapter, setchapter] = useState("");
  const [topicName, settopicName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file && classs && subject &&chapter && topicName) 
    {
        formData.append('file', file); // Ensure 'file' matches Multer configuration
        formData.append('classs', classs);
        formData.append('subject',subject);
        formData.append('chapter', chapter);
        formData.append('topicName', topicName);
        //console.log(file,classs);
    }    
      


    try {
      await customFetch.post('/subs/createcontent', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Content added successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <form
        method="post"
        encType="multipart/form-data"
        className="form"
        onSubmit={handleSubmit}
      >
        <h4 className="form-title">add content</h4>
        <div className="form-center">
          <Formrow
            type="text"
            name="classs"
            labelText="class"
            onChange={(e) => setclasss(e.target.value)}
            defaultValue=''
          />
          <Formrow
            type="text"
            name="subject"
            onChange={(e) => setsubject(e.target.value)}
          />
          <Formrow
            type="text"
            name="chapter"
            onChange={(e) => setchapter(e.target.value)}
          />
          <Formrow
            type="text"
            labelText="topic name"
            name="topicName"
            onChange={(e) => settopicName(e.target.value)}
          />
          <Formrow
            type="file"
            name="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
