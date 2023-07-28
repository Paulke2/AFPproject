import React from "react";
import { Form,Button } from "react-bootstrap";
import "./Searchbar.css";

const SearchBar = () => {
    return (
        <div className="wrap">
            <div className="search">
                <Form.Group controlId="editName">
                    <Form.Control
                        className="searchBar"
                        value="ttttt"
                        placeholder="search"
                    />
                </Form.Group>
                <Button className="searchButton">🔍</Button>
            </div>
           
        </div>
    );
}

export default SearchBar;