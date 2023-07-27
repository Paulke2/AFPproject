import React, { useEffect, useState } from "react";
const Home = () => {
  //fetching data
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
        console.log(projects);
      const response = await fetch("/projects");

      const json = await response.json();

      if (response.ok) {
        setProjects(json);
      }
    };
    fetchProjects();
  }, []);
  return (
    <>{projects &&
    projects.map((project)=> (
        <div>
            {project.name}
        </div>
    ))}</>
  );
};

export default Home;