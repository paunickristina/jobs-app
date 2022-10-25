// components
import JobItem from "../JobItem";

const JobsList = ({ jobs }) => {
  return (
    <div className="lg:w-3/6 py-3">
      <h2 className="text-xl mb-12">All jobs:</h2>
      {jobs &&
        jobs.map((job) => (
          <JobItem key={job._id} job={job} visible={true} clickable={false} />
        ))}
    </div>
  );
};

export default JobsList;
