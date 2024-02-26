import React from "react";

const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
            <input 
                className="form-control"
                value={props.searchValue}
                onChange={(e) => props.setSearchValue(e.target.value)}
                placeholder="Type to search....."
            />
        </div>
    );
}
export default SearchBox;
