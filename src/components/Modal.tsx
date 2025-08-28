import React, { useEffect, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Status } from "../pages/authUser/authType";
import { editTodos, resetStatus } from "../store/todoSlice";
interface Modalprops {
  closeEditModal: () => void;
  todoId: number;
  oldTitle: string;
  oldDescription: string;
}

const Modal: React.FC<Modalprops> = ({
  closeEditModal,
  todoId,
  oldTitle,
  oldDescription,
}) => {
  const { status } = useAppSelector((state) => state.todo);
  const [loading, setLoading] = useState(false);
  const [todoTitle, setTodoTitle] = useState(oldTitle);
  const [todoDescription, setTodoDescription] = useState(oldDescription);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        editTodos({
          id: todoId,
          data: {
            title: todoTitle,
            description: todoDescription,
            attachment: null,
          },
        })
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status === Status.Success) {
      setLoading(false);
      closeEditModal();
      dispatch(resetStatus())
    }
  }, [status]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
          id="modal"
        >
          <div
            role="alert"
            className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
          >
            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
              <div className="w-full flex justify-start text-gray-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-wallet"
                  width={52}
                  height={52}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                </svg>
              </div>
              <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                Enter Todo Details
              </h1>
              <label
                htmlFor="title"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Title
              </label>
              <input
                id="title"
                onChange={(e) => setTodoTitle(e.target.value)}
                value={todoTitle}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="James"
              />
              <label
                htmlFor="description"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Description
              </label>
              <div className="relative mb-5 mt-2">
                <textarea
                  id="description"
                  onChange={(e) => setTodoDescription(e.target.value)}
                  value={todoDescription}
                  rows={8}
                  className="text-gray-600 focus:outline-none resize-y min-h-[2.5rem] max-h-40 focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                />
              </div>
              <div className="flex items-center justify-start w-full">
                <button
                id="submitUrlButton"
                type="submit"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                disabled={loading}
              >
                {loading ? "Adding.." : "Add"}
                <svg
                  className="h-4 w-4 inline-block ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
                <button type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
              </div>
              <button
              type="button"
                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                onClick={closeEditModal}
                aria-label="close modal"
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
              
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Modal;
