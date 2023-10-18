import React, { useState } from 'react';

const InventoryManagement = () => {
  // Sample inventory data (replace with actual data structure as needed)
  const [inventory, setInventory] = useState({
    rice: 10,
    vegetables: 5,
    spices: 3,
    // Add more items as needed
  });

  // Function to handle inventory update
  const handleInventoryUpdate = (item, quantity) => {
    // Validate and update inventory
    if (quantity >= 0) {
      setInventory((prevInventory) => ({
        ...prevInventory,
        [item]: quantity,
      }));
    }
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <ul>
        {Object.entries(inventory).map(([item, quantity]) => (
          <li key={item}>
            {item}: {quantity}
            <button onClick={() => handleInventoryUpdate(item, quantity + 1)}>
              Add
            </button>
            <button onClick={() => handleInventoryUpdate(item, quantity - 1)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;
