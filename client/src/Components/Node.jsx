import { useEffect, useState } from "react";
import TreeList from "./TreeList";
import NodeOptions from './NodeOptions';
const API_URL = "http://localhost:8000/api/nodes/";

const Node = () => {
  const [nodes, nodeSet] = useState([]);
  const [formdata, setFormData] = useState({
    name: "",
    parent: "",
  });
  const [showToast, setShowToast] = useState(false);

    useEffect(() => {
    //   fetch all nodes data 
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      nodeSet(data.data);
    } catch (error) {
      alert(error);
    }
  };

// api to create node 
  const CreateNewNode = async () => {
    const postdata = {
      name: formdata.name,
      parent: formdata.parent === "None" ? null : formdata.parent,
    };

   try {
     const res = await fetch(API_URL, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(postdata),
     });

     const responseData = await res.json(); 
     console.log(responseData.message.name);

     if (res.status === 201) {
       fetchNodes();
       setFormData({ name: "", parent: "" });
       setShowToast(true);
     } else {
       alert(responseData.message.name[0]); 
     }
   } catch (error) {
     console.log("Error:", error);
   }
  };
   
  return (
    <div className='container mt-4'>
      <h3 className='text-center mb-4'>Tree Structure</h3>

      {/* Toast */}
      {showToast && (
        <div
          className='toast align-items-center show position-fixed bottom-0 end-0 m-3'
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
          style={{ zIndex: 1050 }}>
          <div className='d-flex'>
            <div className='toast-body'>Node created successfully!</div>
            <button
              type='button'
              className='btn-close me-2 m-auto'
              data-bs-dismiss='toast'
              aria-label='Close'
              onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      )}

      <div className='row'>
        {/* First Div */}
        <div className='col-md-6'>
          <div className='card p-4 shadow-sm'>
            <form>
              <div className='form-group row'>
                <label htmlFor='nodename' className='col-sm-3 col-form-label'>
                  Node Name
                </label>
                <div className='col-md-6'>
                  <input
                    type='text'
                    value={formdata.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    className='form-control'
                    id='nodename'
                    placeholder='Enter Node Name'
                    name='name'
                  />
                </div>
              </div>

              <div className='form-group row mt-2'>
                <label htmlFor='parentnode' className='col-md-3 col-form-label'>
                  Parent Node
                </label>
                <div className='col-md-6'>
                  <select
                    id='parentnode'
                    className='form-control'
                    name='parent'
                    value={formdata.parent}
                    onChange={(e) =>
                      setFormData({ ...formdata, parent: e.target.value })
                    }>
                    <option value=''>None</option>
                    {nodes.map((node) => (
                      <NodeOptions key={node.id} node={node} />
                    ))}
                  </select>
                </div>
                <p className='text-danger text-center small'>
                  If Parent Node is None, it creates a new root node.
                </p>
              </div>

              <div className='text-center mt-3'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={CreateNewNode}>
                  Create Node
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Second Div */}
        <div className='col-md-6'>
          <div className='card p-4 shadow-sm'>
            <h5 className='text-center mb-3'>All Trees</h5>
            {nodes?.map((tree, index) => (
              <div key={index} className='mb-3'>
                <h6 className='text-center'>Tree {index + 1}</h6>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Node</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TreeList item={tree} fetchNodes={fetchNodes} />
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Node;

