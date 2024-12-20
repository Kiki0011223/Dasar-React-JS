import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();  // Corrected variable name

  const saveProduct = async (e) => {
    e.preventDefault();

    const product = { title, price };

    try {
      const response = await fetch('http://localhost:8080/products', {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        navigate("/");  // Redirect to home after saving the product
      } else {
        // Handle errors (e.g., invalid response)
        alert("Failed to save product. Please try again.");
      }
    } catch (error) {
      // Catch network or other errors
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product.");
    }
  };

  return (
    <div>
      <form onSubmit={saveProduct}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
