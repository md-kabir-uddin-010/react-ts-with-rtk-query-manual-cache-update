import "./App.css";
import { useGetUsersQuery } from "./app/features/user/userApi";

import AddUser from "./components/user/addUser";
import UserItem from "./components/user/userItem";

function App() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }
  if (isError) {
    return <p className="text-center text-red-400">Something went wrong!</p>;
  }

  return (
    <div className=" p-4  sm:flex items-center justify-center">
      <div className="w-full h-[100vh] sm:w-[600px]">
        <div>{users?.length === 0 && <p>No Users Found!</p>}</div>

        <div>
          {users &&
            users?.map((item) => <UserItem key={item?.id} user={item} />)}
        </div>

        <div>
          <AddUser />
        </div>
      </div>
    </div>
  );
}

export default App;
