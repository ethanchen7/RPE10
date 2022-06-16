import { useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
const Search = () => {
  const allUsers = useSelector((state) => state.room.allUsers);
  const users = Object.values(allUsers);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilter = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    const newFilter = users.filter((user) =>
      user.email.includes(searchInput.toLowerCase())
    );
    if (searchInput === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };

  const handleUserSelect = (e) => {
    return "";
  };

  return (
    <>
      <div className="person-search-container">
        <div className="search">
          <input
            placeholder="Search for someone by email..."
            value={searchInput}
            onChange={handleFilter}
          />

          {searchInput.length != 0 && (
            <div className="dataResult">
              {filteredUsers.slice(0, 8).map((user) => {
                return (
                  <div
                    className="member-selection"
                    key={`${user.id}`}
                    id={user.id}
                    onClick={handleUserSelect}
                  >
                    {user?.first_name} {user?.last_name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
