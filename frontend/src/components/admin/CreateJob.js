import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useJobsContext } from "../../hooks/useJobsContext";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";

const CreateJob = () => {
  const { dispatch } = useJobsContext();
  const [name, setName] = useState("");
  const [seniority, setSeniority] = useState("default");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const job = { name, location, seniority, description };

    try {
      const response = await fetch("/jobs", {
        method: "POST",
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
        setName("");
        setSeniority("default");
        setLocation("");
        setDescription("");
        setNotification("New job created successfully.");
        dispatch({ type: "CREATE_JOB", payload: json });
      }
    } catch (err) {
      console.log(err);
      setNotification("Could not create a new job.");
    }
  };

  return (
    <div className="w-full mb-8 lg:w-2/5">
      <form onSubmit={handleSubmit} className="py-3">
        <h2 className="text-xl mb-4">Post new job</h2>
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
                    <option>trainee</option>
                    <option>junior</option>
                    <option>mid-level</option>
                    <option>senior</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <ArrowDown width="12px" height="12px" fill="#374151" />
                  </div>
                </div>
              </label>
            </div>
            <div className="w-full md:w-6/12 mb-4 md:mb-0">
              <label>
                <span className="block text-gray-700 text-sm mb-2">
                  Location
                </span>
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
          {/* description(replace with ck editor): */}
          <div>
            {/* <label>
              <span className="block text-gray-700 text-sm mb-2">
                Description
              </span>
              <textarea
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-md p-3 mb-3 focus:outline-none focus:border-gray-700"
                cols="30"
                rows="10"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </label> */}
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
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(e, editor) => {
                const data = editor.getData();
                console.log({ e, editor, data });
                setDescription(data);
              }}
              // onBlur={(event, editor) => {
              //   console.log("Blur.", editor);
              // }}
              // onFocus={(event, editor) => {
              //   console.log("Focus.", editor);
              // }}
            />
          </div>
        </div>
        <div>
          <button className="bg-violet-800 text-white px-3 py-2 rounded-md mb-4">
            Create job
          </button>
          {notification && <p>{notification}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
