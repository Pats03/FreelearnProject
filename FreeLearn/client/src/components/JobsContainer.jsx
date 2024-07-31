import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';

import { useAllJobsContext } from '../pages/Allsubs';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { media } = data;
  if (media.length === 0) {
    return (
      <Wrapper>
        <h2>No media or videos to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {media.map((med) => {
          return <Job key={med._id} {...med}/>;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;