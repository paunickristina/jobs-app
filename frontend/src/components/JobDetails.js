import { Fragment } from "react";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const JobDetails = ({ job }) => {
  return (
    <Fragment>
      <div className="text-gray-900 border border-gray-200 p-5 mb-5 rounded-xl">
        <h2 className="text-3xl font-medium  capitalize">
          {job.name}
        </h2>
        <p className="capitalize">Company - {job.location}</p>
        {/* remove this condition after updating all jobs: */}
        {job.createdAt && <p className="text-gray-500 mb-2">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>}
        <p>Seniority level:</p>
        <p className="text-gray-500"><span className="capitalize">{job.seniority}</span> developer</p>
      </div>
      <p className="px-3">{job.description}</p>
    </Fragment>
  );
};

export default JobDetails;
