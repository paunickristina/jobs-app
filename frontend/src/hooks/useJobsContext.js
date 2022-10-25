import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";

export const useJobsContext = () => {
  const context = useContext(JobsContext);

  return context;
};
