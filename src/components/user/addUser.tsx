import { useEffect, useState } from "react";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../../app/features/user/userApi";
import { removeEditUserData } from "../../app/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface InitialState {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialState = {
  name: "",
  email: "",
  password: "",
};

export default function AddUser() {
  const [inputs, setInputs] = useState(initialState);

  const { user, isEdit } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [addUser, { isLoading }] = useAddUserMutation();
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (isEdit) {
      setInputs({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  }, [isEdit, user]);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // handle form submit action
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      id: Date.now().toString(),
      ...inputs,
    };

    if (!isEdit) {
      addUser(data);
    } else {
      updateUser({ id: user.id, ...inputs });
      dispatch(removeEditUserData());
    }

    setInputs(initialState);
  };

  // update cancle or rest form
  const handleCancleButton = () => {
    dispatch(removeEditUserData());
    setInputs(initialState);
  };

  return (
    <div className=" transition-all">
      <form onSubmit={handleSubmit}>
        <div>
          <label className=" capitalize text-lg" htmlFor="name">
            name
          </label>
          <input
            className=" w-full outline-none border rounded-sm px-3 py-2 block"
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className=" capitalize text-lg" htmlFor="email">
            email
          </label>
          <input
            className=" w-full outline-none border rounded-sm px-3 py-2 block"
            type="text"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className=" capitalize text-lg" htmlFor="password">
            password
          </label>
          <input
            className=" w-full outline-none border rounded-sm px-3 py-2 block"
            type="text"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 flex items-center gap-x-3">
          <button
            disabled={isLoading || updateUserLoading}
            className=" w-full rounded-md px-3 py-2 bg-indigo-500 hover:bg-indigo-600 duration-100 text-white"
            type="submit"
          >
            {isEdit ? "update" : "add"}
          </button>

          {isEdit && (
            <button
              className=" w-16 rounded-md px-3 py-2 bg-orange-500 hover:bg-orange-600 duration-100 text-white"
              type="button"
              onClick={handleCancleButton}
            >
              cancle
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
