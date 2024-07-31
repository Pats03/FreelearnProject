import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useAllJobsContext } from '../pages/Allsubs';
day.extend(advancedFormat);

const Job = ({ _id, file, teacher, topics, createdAt, verified }) => {
  const date = day(createdAt).format('MMM Do, YYYY');
  const chapter = topics?.Chapter;
  const subject = chapter?.subject;
  const standard = subject?.standard?.standard;
  const { user } = useAllJobsContext();
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
          <JobInfo icon={<FaLocationArrow />} text={file} />
          <JobInfo icon={<FaBriefcase />} text={teacher.name} />
          <div className={`status ${verified}`}>
            {verified ? 'Verified' : 'Not Verified'}
          </div>
        </div>

        <footer className="actions">
          {user.role === 'admin' && (
            <Link to={`../edit-content/${_id}`} className="btn edit-btn">
              Edit
            </Link>
          )}
          {user.role === 'legend' && (
            <>
              <Link to={`../edit-content/${_id}`} className="btn edit-btn">
                Edit
              </Link>
              <Form>
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
