function SelectCategory({
  columnCategory,
  selectedCategory,
  onChangeCategory,
}) {
  return (
    <select
      className="w-full bg-custom-bg-secondary accent-primary uppercase border border-custom-text-2 p-1 tracking-wider text-xl rounded-md "
      onChange={onChangeCategory}
      value={selectedCategory}
    >
      {columnCategory.map((el, indx) => {
        return (
          <option
            className="text-custom-text-2"
            key={indx}
            value={el.toLowerCase()}
          >
            {el}
          </option>
        );
      })}
    </select>
  );
}

export default SelectCategory;
