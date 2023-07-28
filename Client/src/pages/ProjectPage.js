import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ProjectPage = ()=>{
    let { id } = useParams();
    const [currentProject, setCurrentProject]=useState({});
    useEffect(() => {
        const fetchProject = async () => {
            
                const response = await fetch(`/projects/${id}`);
                const json = await response.json();
                if(response.ok){
                    setCurrentProject(json);
                }
            }
            fetchProject();
    },[]);
    return (
        <>{currentProject.name}</>
    );
};

export default ProjectPage;