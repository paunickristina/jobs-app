//components
import Search from "./Search";
import Filter from "./Filter";

const TopBar = ({
  jobs,
  query,
  setQuery,
  filterLoc,
  setFilterLoc,
  filterSeniority,
  setFilterSeniority,
}) => {
  const uniqueLoc = jobs
    ? [...new Set(jobs.map((item) => item.location))]
    : null;

  const uniqueLevel = jobs
    ? [...new Set(jobs.map((item) => item.seniority))]
    : null;

  return (
    <div className="p-5 bg-gray-50">
      <Search query={query} setQuery={setQuery} />
      <div className="lg:bg-white lg:p-5">
        <Filter
          jobs={jobs}
          onChange={setFilterLoc}
          filter={filterLoc}
          uniqueValue={uniqueLoc}
          filterOption="location"
        />
        <Filter
          jobs={jobs}
          onChange={setFilterSeniority}
          filter={filterSeniority}
          uniqueValue={uniqueLevel}
          filterOption="experience level"
        />
      </div>
    </div>
  );
};

export default TopBar;
