import React from 'react';
import Select from 'react-select';

const IngredientSelect = ({ ingredients, selectedIngredients, onChange }) => {
  // Convert ingredients data into options required by React Select
  const options = ingredients.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name_ingredient,
  }));

  return (
    <Select
      options={options}
      value={options.filter((option) => selectedIngredients.includes(option.value))}
      onChange={onChange}
      placeholder="Select ingredients"
      isMulti={true} // Enable multiple selection
    />
  );
};

export default IngredientSelect;
