import { Fragment } from "react";
import { useJobsContext } from "../hooks/useJobsContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const JobItem = ({ job, onShowJob, clickable, visible, onUpdateJob }) => {
  const { dispatch } = useJobsContext();

  const handleDelete = async () => {
    const response = await fetch(`/jobs/${job._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_JOB", payload: json });
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  };

  const handleUpdate = (id) => {
    onUpdateJob(id)
  }

  return (
    <Fragment>
      <div
        onClick={onShowJob}
        className={`relative text-lg text-gray-500 bg-white border border-gray-200 p-5 rounded-xl mb-4 ${
          clickable
            ? "lg:hover:shadow-xl cursor-pointer transition-all ease-in-out"
            : ""
        }`}
      >
        <h3 className="text-xl font-medium text-gray-900 capitalize">
          {job.name}
        </h3>
        <p className="capitalize text-gray-900">{job.location}</p>
        <p className="capitalize text-base mb-2">{job.seniority}</p>
        {/* remove this condition after updating all jobs: */}
        {job.createdAt && <p className="text-base">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>}
        {visible && (
          <div className="absolute right-5 bottom-5">
            <button onClick={() => handleUpdate(job._id)} className="flex justify-center border border-violet-800 rounded-md bg-violet-800 lg:p-1 text-white text-sm w-20 mb-2 lg:leading-6 lg:hover:bg-white lg:hover:text-violet-800 transition-all ease-in-out">
              Update
            </button>
            <button
              onClick={handleDelete}
              className="flex justify-center border border-violet-800 rounded-md bg-violet-800 lg:p-1 text-white text-sm w-20 lg:leading-6 lg:hover:bg-white lg:hover:text-violet-800 transition-all ease-in-out"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default JobItem;
