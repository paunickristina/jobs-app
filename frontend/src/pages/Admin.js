import { Fragment, useEffect, useState } from "react";
import { useJobsContext } from "../hooks/useJobsContext";

// components
import Navbar from "../components/Navbar";
import CreateJob from "../components/admin/CreateJob";
import UpdateJob from "../components/admin/UpdateJob";
import JobItem from "../components/JobItem";

const Admin = () => {
  const { jobs, dispatch } = useJobsContext();
  const [errorJobs, setErrorJobs] = useState(null);
  const [job, setJob] = useState(null);
  const [formRender, setFormRender] = useState(true);

  useEffect(() => {
    // put this in custom hook:
    const fetchJobs = async () => {
      try {
        const response = await fetch("/jobs");
        const json = await response.json();

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (response.ok) {
          setErrorJobs(null);
          dispatch({ type: "SET_JOBS", payload: json });
        }
      } catch (err) {
        console.log(err);
        setErrorJobs("Could not fetch the data.");
      }
    };

    fetchJobs();
  }, [dispatch]);

  const fetchOneJob = async (id) => {
    try {
      const response = await fetch(`/jobs/${id}`);
      const json = await response.json();
      if (!response.ok) {
        throw Error(response.statusText);
      }
      if (response.ok) {
        setJob(json);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateJob = (id) => {
    fetchOneJob(id);
    setFormRender(false);
  };

  const handleClick = (param) => {
    console.log(param);
    setFormRender(param);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="p-5 lg:py-5 lg:px-20 lg:flex lg:justify-between bg-gray-100">
        <div className="w-full mb-8 lg:w-2/5">
          {formRender && <CreateJob />}
          {!formRender && job && (
            <UpdateJob job={job} handleClick={handleClick} />
          )}
        </div>
        <div className="lg:w-3/6 py-3">
          <h2 className="text-xl mb-12">All jobs:</h2>
          {jobs &&
            jobs.map((job) => (
              <JobItem
                key={job._id}
                job={job}
                visible={true}
                clickable={false}
                onUpdateJob={handleUpdateJob}
              />
            ))}
          {errorJobs && <p>{errorJobs}</p>}
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
