import axios from "axios";
import { useState } from "react";


const AddProducts = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState([]);
  const [data, setData] = useState({});
  const [activeInput, setActiveInput] = useState("title");
  const info = [
    { name: "title", type: "text" },
    { name: "price", type: "number", min: 50 },
    { name: "stock", type: "number", min: 1, max: 100 },
    { name: "image", type: "file" },
    { name: "category", type: "text" },
  ];
  // const token = localStorage.getItem("token");

  const handleSelectFiles = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const promises = files.map((file) => {
        const data = new FormData();
        data.append('my_files', file);
        return axios.post('http://localhost:3000/api/image/upload', data);
      });
      const results = await Promise.all(promises);
      setRes(results.map((res) => res.data))
    } catch (error) {
      alert(error.message);
    } finally {
      data.image = res.map(res => res[0].secure_url)
      setLoading(false);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/products",
        {
          ...data,
        },
        {
          withCredentials: true
        }
      );
      res.status === 201 && alert("Product added successfully");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    setData({});
  };

  return (
    <form className="px-8 h-[58vh]">
      <h3>Add Products</h3>
      {/**Takes in the form data and sends it to the backend. Data to be sent are title, description, price, stock and image* all fields are required*/}
      <div className="flex gap-x-3">
        <div className="flex-1">
          {info.map((info) => (
            <div key={info.name} className="flex flex-col">
              <label
                htmlFor={info.name}
                className={`${
                  activeInput === info.name
                    ? "text-[#FA61D0] font-extrabold"
                    : ""
                }`}
              >
                {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
              </label>
              <input
                className="pl-2 outline-none h-8 rounded-sm  border-gray-300"
                type={info.type}
                multiple
                placeholder={
                  info.name.charAt(0).toUpperCase() + info.name.slice(1)
                }
                min={info.min}
                id={info.name}
                onChange={(e) =>
                  info.name != "image"? setData({ ...data, [info.name]: e.target.value }): handleSelectFiles(e)
                }
                onClick={() => setActiveInput(info.name)}
              />
            </div> 
          ))}
          {
              activeInput === "image" && files?
              <button onClick={(e) =>handleUpload(e)} className="bg-green-500 py-3 px-6 mt-1 rounded-lg text-white font-extrabold text-2xl">
                {loading? 'Uploading...' : 'Upload'}
              </button>
              :null
            }
        </div>
        <div className="flex-1">
          <div className="flex flex-col w-full">
            <label
              htmlFor="description"
              className={`${
                activeInput === "description"
                  ? "text-[#FA61D0] font-extrabold"
                  : ""
              }`}
            >
              description
            </label>
            <textarea
              name="description"
              className="outline-none pl-4 h-[158px]"
              id="description"
              placeholder="Add product description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              onClick={() => setActiveInput("description")}
            />
            <div className="flex overflow-x-auto gap-x-2 mt-3">
              {res?
              res.map((res, index) => {
                return <img key={index} src={res[0].secure_url} alt="" className="h-[120px] w-[120px]"/>
              })
              :null}
            </div>
          </div>
        </div>
      </div>
      <button
  type="submit"
  onClick={(e) => handleSubmit(e)}
  className={`${data.title && data.price && data.stock && data.image && data.category && data.description
    ? "bg-green-500 cursor-pointer"
    : "bg-gray-medium cursor-not-allowed"}  py-3 px-6 text-white rounded-2xl mt-4`
  }
  disabled={!(data.title && data.price && data.stock && data.image && data.category && data.description)}
>
  Add
</button>
    </form>
  );
};

export default AddProducts;
