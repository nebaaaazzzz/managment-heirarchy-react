import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { uid } from "react-uid";
import Tree from "../tree";
function traverse(newArr: any) {
  let list: Array<any> = [];
  function traverseInner() {
    for (let i = 0; i < [...newArr.values()].length; i++) {
      if (newArr[i].children) {
        list.push({ title: newArr[i].title, id: newArr[i].key });
        traverse(newArr[i].children);
      } else {
        list.push({ title: newArr[i].title, id: newArr[i].key });
      }
    }
  }
  if (newArr && newArr.length) {
    traverseInner();
  }
  return list;
}
const Modal = (props: {
  isOpen: boolean;
  setIsOpen: Function;
  tree: Tree | undefined;
  setTree: Function;
  data: any;
}) => {
  const memoValue = useMemo(
    () => traverse([...(props.tree ? props.tree.preOrderTraversal() : [])]),
    [props.tree, props.isOpen]
  );

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [managingDepartment, setManaginingDepartment] = useState<string>("");
  useEffect(() => {
    console.log("is effecting");
    if (props.data) {
      setName(props.data?.title);
      setDescription(props.data?.description);
      setManaginingDepartment(props?.data?.key);
    } else {
      setName("");
      setDescription("");
      setManaginingDepartment("");
    }
  }, [props.data, props.tree]);
  function handleSave(e: React.SyntheticEvent) {
    e.preventDefault();
    props.setIsOpen(!props.isOpen);
    if (props.data) {
      props.data.value = name;
      props.data.title = name;
      props.data.description = description;
      console.log(props.data);
    } else if (props.tree) {
      props.tree.insert(
        managingDepartment ? managingDepartment : memoValue[0].id,
        uid(name),
        {
          description: description,
          title: name,
        }
      );
      toast("Created ", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        type: "success",
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDescription("");
      setName("");
      setManaginingDepartment("");
      props.setTree(props.tree);
    } else {
      toast("Created ", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        type: "success",
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.setTree(
        new Tree(uid(name), {
          title: name,
          description,
        })
      );
      setDescription("");
      setName("");
      setManaginingDepartment("");
    }
  }
  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className={`${
        props.isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed  z-50 p-14 w-full top-10 right-20 left-0 md:inset-0  md:h-full`}
    >
      <div className="shadow-2xl shadow-indigo-800 relative m-auto w-full mt-20 max-w-lg h-full md:h-auto">
        <div className="relative  rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => props.setIsOpen(!props.isOpen)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <form
            action=""
            className="p-5"
            onSubmit={handleSave}
            autoComplete={"false"}
          >
            <div className="py-6 px-6 lg:px-8 ">
              <div className="flex items-center">
                <label htmlFor="name-post" className="text-white">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="ml-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name=""
                  placeholder="Enter managining name"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  id="name-post"
                />
              </div>
              <div className="flex items-center my-2">
                <label htmlFor="description-post" className="text-white">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="enter description"
                  className="bg-gray-50 ml-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name=""
                  required
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  value={description}
                  id="description-post"
                />
              </div>
              {!props.data ? (
                <div className="flex items-center">
                  <label htmlFor="countries" className="text-white">
                    Select Managinig Department
                  </label>
                  <select
                    id="managing-department-post"
                    value={managingDepartment}
                    placeholder="select parent"
                    required
                    onChange={(e) => {
                      setManaginingDepartment(e.target.value);
                    }}
                    className="bg-gray-50 ml-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {memoValue.length ? (
                      memoValue
                        .filter((val) => {
                          return val.id != managingDepartment;
                        })
                        .map((item: any) => {
                          return (
                            <>
                              <option value={item.id}>{item.title}</option>
                            </>
                          );
                        })
                    ) : (
                      <option>root</option>
                    )}
                  </select>
                </div>
              ) : (
                <></>
              )}
            </div>
            <button
              type="submit"
              className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
