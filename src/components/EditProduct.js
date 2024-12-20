import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);  // Error state for feedback

  const navigate = useNavigate();  // Renamed to navigate for clarity
  const { id } = useParams();

  // Fetch product by ID on component mount
  useEffect(() => {
    getProductById();
  }, [id]);

  const getProductById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setTitle(data.title);
      setPrice(data.price);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching product:", error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    
    // Validation for price
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    const product = { title, price };

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      navigate("/");  // Navigate to home page after updating
    } catch (error) {
      setError(error.message);
      console.error("Error updating product:", error);
    }
  };

  // Show loading state while fetching product data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>

      {error && <div className="notification is-danger">{error}</div>}  {/* Error message */}

      <form onSubmit={updateProduct}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Price"
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
