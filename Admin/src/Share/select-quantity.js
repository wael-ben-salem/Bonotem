import React from 'react';

const QuantityInput = ({ editedQuantites, setEditedQuantites }) => {
  return (
    <div className="mb-3">
      <label htmlFor="quantite-field" className="form-label">Quantite</label>
      <input 
        type="text" 
        id="quantite-field" 
        className="form-control" 
        placeholder="Enter la marge" 
        value={editedQuantites.join(', ')} 
        onChange={(e) => setEditedQuantites(e.target.value.split(',').map(q => q.trim()))} 
        required 
      />
    </div>
  );
};

export default QuantityInput;
