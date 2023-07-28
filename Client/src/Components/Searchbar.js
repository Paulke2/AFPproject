import React from "react";
import { Form,Button } from "react-bootstrap";
import "./Searchbar.css";

const SearchBar = (props) => {
    return (
        <div className="wrap">
            <div className="search">
                <Form.Group controlId="editName">
                    <Form.Control
                        className="searchBar"
                        value={props.projectSearch}
                        placeholder="search"
                        onChange={(
                            event
                        ) => props.setProjectSearch(event.target.value)}
                    />
                </Form.Group>
                <Button className="searchButton">🔍</Button>
            </div>
           
        </div>
    );
}

export default SearchBar;