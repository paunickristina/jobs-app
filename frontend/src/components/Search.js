import { ReactComponent as SearchIcon } from "../assets/icons/search-icon.svg";

const Search = ({ query, setQuery }) => {
  return (
    <div className="bg-gray-50 lg:bg-white lg:p-3 lg:border-b-2 lg:border-gray-200 lg:flex lg:justify-between">
      <div className="flex items-center relative border lg:border-y-0 lg:border-l-0 border-gray-200 rounded-md lg:rounded-none bg-white p-3 mb-3 lg:mb-0 lg:w-1/3">
        <SearchIcon width="20px" height="20px" />
        <label className="flex ml-3">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Search job by title or location..."
            className="w-11/12 outline-none"
          />
        </label>
      </div>
      {/* <button className="flex justify-center rounded-md bg-violet-800 p-2 lg:p-1 text-white w-full lg:w-28 lg:leading-9">
        Search
      </button> */}
    </div>
  );
};

export default Search;
