const Filter = ({ onChange, filter, uniqueValue, filterOption }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={filter}
      className="w-full lg:w-1/6 bg-white border border-gray-200 text-sm rounded-md p-2.5 mb-3 lg:mb-0 lg:mr-3 outline-none capitalize"
    >
      <option value="all">{filterOption}</option>
      {uniqueValue &&
        uniqueValue.map((loc) => (
          <option key={loc} value={loc} className="capitalize">
            {loc}
          </option>
        ))}
    </select>
  );
};

export default Filter;
