
const SearchChecklist = props => {
  return (
    <div className="SearchChecklist">
      <h2>Printing</h2>
      <div className="search-printing">
        <label>
          <input type="checkbox" />
          <span>Holofoil</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>1st Edition Holofoil</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Reverse Holofoil</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Normal</span>
        </label>
      </div>
      <h2>Price Range</h2>
      <div className="search-price">
        <label>
          <input type="checkbox" />
          <span>0 - 50</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>50 - 100</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>100 - 200</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>200 +</span>
        </label>
      </div>

    </div>
  );
}

export default SearchChecklist;
