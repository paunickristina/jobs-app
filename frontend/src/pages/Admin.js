import { Fragment, useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";

// components
import Navbar from "../components/Navbar";
import CreateJob from "../components/admin/CreateJob";
import JobsList from "../components/admin/JobsList";

const Admin = () => {
  const {jobs, dispatch} = useJobsContext();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/jobs");
      const json = await response.json();
      if (response.ok) {
        dispatch({type: "SET_JOBS", payload: json})
      }
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <Fragment>
      <Navbar />
      <div className="p-5 lg:py-5 lg:px-20 lg:flex lg:justify-between bg-gray-100">
        <CreateJob />
        <JobsList jobs={jobs} />
      </div>
    </Fragment>
  );
};

export default Admin;
