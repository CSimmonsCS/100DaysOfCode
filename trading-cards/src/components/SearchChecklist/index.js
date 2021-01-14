import React from 'react';

const SearchChecklist = props => {

  const printings = ['Holofoil', '1st Edition Holofoil', 'Reverse Holofoil', 'Normal'];

  return (
    <div className="SearchChecklist">
      <h2>Printing</h2>
      <div className="search-printing">
        {
          printings.map(printing => {
            return (
              <label>
                <input type="checkbox"
                  checked={props.checkedBoxes.find((ch) => ch === printing)}
                  onChange={e => props.handleCheckboxPrinting(e, printing)}
                />
                <span>{printing}</span>
              </label>
            );
          })
        }
      </div>
      <h2>Price Limit</h2>
      <div className="search-price">
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 5)}
            onChange={e => props.handleCheckboxPrinting(e, 5)}
          />
          <span>&#60;$5</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 10)}
            onChange={e => props.handleCheckboxPrinting(e, 10)}
          />
          <span>&#60;$10</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 25)}
            onChange={e => props.handleCheckboxPrinting(e, 25)}
          />
          <span>&#60;$25</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 50)}
            onChange={e => props.handleCheckboxPrinting(e, 50)}
          />
          <span>&#60;$50</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 100)}
            onChange={e => props.handleCheckboxPrinting(e, 100)}
          />
          <span>&#60;$100</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 200)}
            onChange={e => props.handleCheckboxPrinting(e, 200)}
          />
          <span>&#60;$200</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 500)}
            onChange={e => props.handleCheckboxPrinting(e, 500)}
          />
          <span>&#60;$500</span>
        </label>
        <label>
          <input type="checkbox"
            checked={props.checkedBoxes.find((ch) => ch === 750)}
            onChange={e => props.handleCheckboxPrinting(e, 750)}
          />
          <span>&#60;$750</span>
        </label>
      </div>

    </div>
  );
}

export default SearchChecklist;
