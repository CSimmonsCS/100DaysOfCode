import React from 'react';

const SearchChecklist = props => {

  const printings = ['Holofoil',
                     '1st Edition Holofoil',
                     'Reverse Holofoil',
                     'Normal'];

  const prices = [5, 10, 25, 50, 100, 200, 500, 750];

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
        {
          prices.map(price => {
            return (
              <label>
                <input type="checkbox"
                  checked={props.checkedBoxes.find((ch) => ch === price)}
                  onChange={e => props.handleCheckboxPrinting(e, price)}
                />
                <span>&#60;${price}</span>
              </label>
            );
          })
        }
      </div>

    </div>
  );
}

export default SearchChecklist;
