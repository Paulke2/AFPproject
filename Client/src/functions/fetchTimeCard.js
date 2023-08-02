const fetchTimeCard = async (id) => {
    const response = await fetch(`/timeCards/${id}`);

    const json = await response.json();

    if (response.ok) {
      return(json);
    }
  };
  export default fetchTimeCard;