import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

const UserInfo = () => {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <p>nom : {user.name_user}</p>
      <p>prénom : {user.first_name_user}</p>
      <p>pseudo : {user.alias_user}</p>
      <p>description : {user.description_user}</p>
    </div>
  );
};
export default UserInfo;
