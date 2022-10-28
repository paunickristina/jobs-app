import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useJobsContext } from "../hooks/useJobsContext";

// components
import TopBar from "../components/TopBar";
import JobItem from "../components/JobItem";
import JobDetails from "../components/JobDetails";

const Home = () => {
  const { jobs, dispatch } = useJobsContext();
  const [job, setJob] = useState(null);
  const [errorJobs, setErrorJobs] = useState(null);
  const [errorJob, setErrorJob] = useState(null);
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name", "location"]);
  const [filterLoc, setFilterLoc] = useState("all");
  const [filterSeniority, setFilterSeniority] = useState("all");

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
        setErrorJob(null);
        setJob(json);
      }
    } catch (err) {
      console.log(err);
      setErrorJob("Could not fetch the data.");
    }
  };

  const handleShowJob = (id) => {
    fetchOneJob(id);
  };

  const filteredJobs = (items) => {
    if (filterLoc !== "all" && filterSeniority !== "all") {
      return items.filter((item) => {
        return (
          item.location === filterLoc && item.seniority === filterSeniority
        );
      });
    } else if (filterLoc !== "all" || filterSeniority !== "all") {
      return items.filter((item) => {
        return (
          item.location === filterLoc || item.seniority === filterSeniority
        );
      });
    }
    return items;
  };

  const search = (items) => {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });
    });
  };

  return (
    <Fragment>
      <TopBar
        jobs={jobs}
        query={query}
        setQuery={setQuery}
        filterLoc={filterLoc}
        setFilterLoc={setFilterLoc}
        filterSeniority={filterSeniority}
        setFilterSeniority={setFilterSeniority}
      />
      <div className="lg:flex lg:justify-between p-5 border-t border-gray-200">
        <div className="lg:w-2/5">
          {/* event on custom component: */}
          {jobs &&
            search(filteredJobs(jobs)).map((job) => (
              <JobItem
                onShowJob={() => handleShowJob(job._id)}
                key={job._id}
                job={job}
                clickable={true}
                visible={false}
              />
            ))}
          {errorJobs && <p>{errorJobs}</p>}
        </div>
        <div className="w-7/12 px-5 hidden lg:block">
          {job && <JobDetails job={job} />}
          {errorJob && <p>{errorJob}</p>}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
