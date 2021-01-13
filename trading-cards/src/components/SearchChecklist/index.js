
const SearchChecklist = props => {
  return (
    <div className="SearchChecklist">
      <h2>Printing</h2>
      <div className="search-printing">
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 'Holofoil')}
            onChange={e => props.handleCheckboxPrinting(e, 'Holofoil')}
          />
          <span>Holofoil</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === '1st Edition Holofoil')}
            onChange={e => props.handleCheckboxPrinting(e, '1st Edition Holofoil')}
          />
          <span>1st Edition Holofoil</span>
        </label>
        <label>
          <input type="checkbox"
          checked={props.checkedBoxes.find((ch) => ch === 'Reverse Holofoil')}
          onChange={e => props.handleCheckboxPrinting(e, 'Reverse Holofoil')}
          />
          <span>Reverse Holofoil</span>
        </label>
        <label>
          <input type="checkbox"
          checked={props.checkedBoxes.find((ch) => ch === 'Normal')}
          onChange={e => props.handleCheckboxPrinting(e, 'Normal')}
          />
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
