import React from "react";

function user_rept() {
  const [users, setUsers] = useState([]); // Create a state variable called users

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return <div></div>;
}

export default user_rept;
