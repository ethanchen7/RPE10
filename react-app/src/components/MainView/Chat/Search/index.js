import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRoom } from "../../../../store/room";
import "./index.css";
const Search = ({ existingUsers }) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.room.allUsers);
  const session = useSelector((state) => state.session.user);
  const users = Object.values(allUsers);
  const availableUsers = users.filter(
    (user) => user.id !== session.id && !existingUsers.has(user.id)
  );
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilter = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    const newFilter = availableUsers.filter((user) =>
      user.email.includes(searchInput.toLowerCase())
    );
    if (searchInput === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };

  const handleUserSelect = (e) => {
    const payload = {
      friend_id: e.target.id,
    };
    dispatch(addRoom(payload));
    setSearchInput("");
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
