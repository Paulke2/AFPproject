const SearchResultFilter = (projectSearch, name, projectID) => {
    //this function takes projectsearch as a prop
    //and if it matches the job location/project name/project id
    // it will show the project
    return (projectID
      .toString()
      .toLowerCase()
      .includes(projectSearch.toString().toLowerCase()) ||
      name.toLowerCase().includes(projectSearch) ||
      projectSearch.toLowerCase() === "")&& name !== "Office"
      ? true
      : false;
  };

  export default SearchResultFilter;