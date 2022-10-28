import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useJobsContext } from "../../hooks/useJobsContext";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";

const UpdateJob = ({ job, handleClick }) => {
  const { dispatch } = useJobsContext();
  const [name, setName] = useState(job.name);
  const [seniority, setSeniority] = useState(job.seniority);
  const [location, setLocation] = useState(job.location);
  const [description, setDescription] = useState(job.description);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setName(job.name);
    setSeniority(job.seniority);
    setLocation(job.location);
    setDescription(job.description);
    setNotification("");
  }, [job]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const job = { name, location, seniority, description };

    try {
      const response = await fetch(`/jobs/${id}`, {
        method: "PATCH",
        body: JSON.stringify(job),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (response.ok) {
        console.log();
        setName("");
        setSeniority("default");
        setLocation("");
        setDescription("");
        setNotification("This job was updated successfully.");
        dispatch({ type: "UPDATE_JOB", payload: json });
      }
    } catch (err) {
      console.log(err);
      setNotification("Could not update.");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, job._id)} className="py-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl mb-4">Update job</h2>
        <button onClick={() => handleClick(true)} className="bg-violet-800 text-white px-3 py-2 rounded-md mb-4">
          Back to create new job
        </button>
      </div>
      <div className="border-b-2 py-2 mb-5">
        <div className="mb-4">
          <label>
            <span className="block text-gray-700 text-sm mb-2">Title</span>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md p-3 mb-3 focus:outline-none focus:border-gray-700"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Job title"
            />
          </label>
        </div>
        <div className="md:flex md:justify-between">
          <div className="w-full md:w-5/12 mb-4 md:mb-0">
            <label>
              <span className="block text-gray-700 text-sm mb-2">
                Experience level
              </span>
              <div className="relative">
                <select
                  onChange={(e) => setSeniority(e.target.value)}
                  value={seniority}
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-3 pr-8 rounded-md focus:outline-none focus:border-gray-500 capitalize"
                >
                  <option value={"default"} disabled>
                    Choose an option:
                  </option>
                  <option value={"trainee"}>trainee</option>
                  <option value={"junior"}>junior</option>
                  <option value={"mid-level"}>mid-level</option>
                  <option value={"senior"}>senior</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <ArrowDown width="12px" height="12px" fill="#374151" />
                </div>
              </div>
            </label>
          </div>
          <div className="w-full md:w-6/12 mb-4 md:mb-0">
            <label>
              <span className="block text-gray-700 text-sm mb-2">Location</span>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md p-3 mb-3 focus:outline-none focus:border-gray-700"
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                required
                placeholder="Location"
              />
            </label>
          </div>
        </div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "undo",
              "redo",
              "bulletedList",
              "numberedList",
              "blockQuote",
            ],
            placeholder: "Insert job description...",
          }}
          data={description}
          onChange={(e, editor) => {
            const data = editor.getData();
            setDescription(data);
          }}
        />
      </div>
      <div>
        <button className="bg-violet-800 text-white px-3 py-2 rounded-md mb-4">
          Update job
        </button>
        {notification && <p>{notification}</p>}
      </div>
    </form>
  );
};

export default UpdateJob;
