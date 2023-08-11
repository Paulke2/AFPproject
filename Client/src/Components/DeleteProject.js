

const deleteProject=(props) =>{
    onst [error, setError] = useState(null);
    const handleDelete= async (id) => {
        try {
            const response = await fetch(`/projects/${id}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            });
        
            const json = await response.json();
            if (!response.ok) {
              // Handle error
              setError(json.error);
            } else {
              setError(null);
              console.log("employee deleted", json);
            }
          } catch (error) {
            console.error("Error while deleting project:", error);
            setError("Error while deleting project");
          }
        };
return(<><Button onClick={() => handleDelete(props.proj._id)} variant="danger">-</Button></>);

}

export default deleteProject;


