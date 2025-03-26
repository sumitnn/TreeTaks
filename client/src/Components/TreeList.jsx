import { useState } from "react";

const API_URL = "http://localhost:8000/api/nodes/";

const TreeList = ({ item, fetchNodes }) => {
    // state defined for edit 
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);

  // Update Node
  const updateNode = async () => {
    try {
      const res = await fetch(`${API_URL}${item.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });

      if (res.ok) {
        fetchNodes(); 
        setIsEditing(false);
      } else {
        alert("Failed to update node");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Node
  const deleteNode = async () => {
    if (window.confirm("Are you sure you want to delete this node?")) {
      try {
        const res = await fetch(`${API_URL}${item.id}/`, {
          method: "DELETE",
        });

        if (res.ok) {
            fetchNodes();
        } else {
          alert("Failed to delete node");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <tr>
        <td>
          {isEditing ? (
            <input
              type='text'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className='form-control form-control-sm'
            />
          ) : (
            item.name
          )}
        </td>
        <td>
          {isEditing ? (
            <>
              <button
                className='btn btn-success btn-sm mx-1'
                onClick={updateNode}>
                Save
              </button>
              <button
                className='btn btn-secondary btn-sm'
                onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className='btn btn-warning btn-sm mx-1'
                onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className='btn btn-danger btn-sm' onClick={deleteNode}>
                Delete
              </button>
            </>
          )}
        </td>
      </tr>

      {item.children &&
        item.children.map((child, index) => (
          <TreeList key={index} item={child} fetchNodes={fetchNodes} />
        ))}
    </>
  );
};

export default TreeList;
