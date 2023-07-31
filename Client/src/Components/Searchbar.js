import React from "react";
import { Form,Button } from "react-bootstrap";
import "./Searchbar.css";
import searchIcon from "../pictures/search_icon.png";
const SearchBar = (props) => {
    return (
        <div className="wrap">
            <div className="search">
                <Form.Group controlId="editName">
                    <Form.Control
                    style={{color:"black"}}
                        className="searchBar"
                        value={props.projectSearch}
                        placeholder="search"
                        onChange={(
                            event
                        ) => props.setProjectSearch(event.target.value)}
                    />
                    
                </Form.Group>
                <div className="searchButton">
                <img src={searchIcon} className="searchIcon"/>
                </div>
            </div>
           
        </div>
    );
}

export default SearchBar;