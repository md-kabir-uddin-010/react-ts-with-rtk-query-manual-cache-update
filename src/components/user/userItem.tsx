import { User } from "../../app/features/user/type";
import { useRemoveUserMutation } from "../../app/features/user/userApi";
import { addEditUserData } from "../../app/features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";

type Props = {
  user: User;
};

export default function UserItem({ user }: Props) {
  const [removeUser] = useRemoveUserMutation();
  const { id, email, name, password } = user;

  const dispatch = useAppDispatch();

  // delete user
  const handleDeleteUser = () => {
    if (id) {
      removeUser(id);
    }
  };

  // edit user
  const handleEditUser = () => {
    if (id) {
      dispatch(addEditUserData(user));
    }
  };

  return (
    <div className=" group/user p-4 border rounded-md my-2 flex items-center justify-between ">
      <div>
        <h2>Name : {name}</h2>
        <p>Email : {email}</p>
        <p>Password : {password}</p>
      </div>
      <div className=" invisible group-hover/user:visible">
        <button
          className=" mr-2 bg-indigo-500 rounded-md px-2 py-1 text-white"
          onClick={handleEditUser}
        >
          Edit
        </button>
        <button
          className=" bg-red-500 rounded-md px-2 py-1 text-white"
          onClick={handleDeleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
