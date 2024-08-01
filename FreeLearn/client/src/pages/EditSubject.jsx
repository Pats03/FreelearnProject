import { Formrow } from '../components';
import FormRowSelect from '../components/FormRowSelect';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { Form, useNavigation, redirect,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useState } from 'react';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/teacher/singlemedia/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('../all-subs');
  }
};

const EditSubject = () => {
  //const { user } = useOutletContext();
  const navigation = useNavigation();
  const { media } = useLoaderData();
  const { id: mediaId } = useParams();

  const isSubmitting = navigation.state === 'submitting';
  const [file, setFile] = useState('');
  const [currentFileName, setCurrentFileName] = useState(media.file);
  const [classs, setclasss] = useState(
    media.topics.Chapter.subject.standard.standard
  );
  const [subject, setsubject] = useState(media.topics.Chapter.subject.name);
  const [chapter, setchapter] = useState(media.topics.Chapter.name);
  const [topicName, settopicName] = useState(media.topics.name);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file && classs && subject && chapter && topicName) {
      formData.append('file', file); // Ensure 'file' matches Multer configuration
      formData.append('classs', classs);
      formData.append('subject', subject);
      formData.append('chapter', chapter);
      formData.append('topicName', topicName);
      //console.log(file,classs);
    }
    try {
      await customFetch.patch(`/teacher/editmedia/${mediaId}`, formData, {
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
        <h4 className="form-title">Edit content</h4>
        <div className="form-center">
          <Formrow
            type="text"
            name="classs"
            defaultValue={media.topics.Chapter.subject.standard.standard}
            labelText="class"
            onChange={(e) => setclasss(e.target.value)}
          />
          <Formrow
            type="text"
            name="subject"
            defaultValue={media.topics.Chapter.subject.name}
            onChange={(e) => setsubject(e.target.value)}
          />
          <Formrow
            type="text"
            name="chapter"
            defaultValue={media.topics.Chapter.name}
            onChange={(e) => setchapter(e.target.value)}
          />
          <Formrow
            type="text"
            labelText="topic name"
            name="topicName"
            defaultValue={media.topics.name}
            onChange={(e) => settopicName(e.target.value)}
          />
          <div className="form-row">
            <label htmlFor="file" className="form-label">
              File
            </label>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              className="form-input"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setCurrentFileName(e.target.files[0]?.name || currentFileName);
              }}
            />
            {currentFileName && <p>Current file: {currentFileName}</p>}
          </div>
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
export default EditSubject;
