import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Modal from "./components/Modal";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { TreeSelect } from "antd";
import Tree from "./tree";
import { uid } from "react-uid";

function App() {
  const [value, setValue] = useState<string | undefined>(undefined);
  let [tree, setTree] = useState<Tree>();
  const [node, setNode] = useState<any>();
  const [data, setData] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLeaf, setIsLeaf] = useState<boolean>(false);
  const onChange = (newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (value) {
      setNode(tree?.find(uid(value)));
    }
    if (node) {
      setIsLeaf(node.children.length === 0);
    }
    if (!value) {
      setData(undefined);
    }
  }, [value, node, tree]);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Nav />
      <div className="flex flex-col items-end">
        {value ? (
          <div className="flex">
            <button
              className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e: React.SyntheticEvent) => {
                const val = tree?.find(uid(value));
                setData(val);
                setIsOpen(true);
              }}
            >
              Edit
            </button>
            {isLeaf ? (
              <button
                className="m-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  if (!node.parent) {
                    toast("You can't remove THe Head", {
                      autoClose: 500,
                      type: "warning",
                    });
                  }
                  const bool = tree?.drop(node.key);
                  if (bool) {
                    toast("Successfully remove", {
                      autoClose: 500,
                      type: "success",
                    });
                  }
                }}
              >
                Remove
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <button
            className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            Create
          </button>
        )}

        {tree ? (
          <TreeSelect
            showSearch
            style={{ width: "50%", borderColor: "black" }}
            value={value}
            className="self-center "
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={[[...tree.preOrderTraversal()][0]]}
          />
        ) : (
          <p className="self-center">nothing to show here</p>
        )}
      </div>
      <div>
        <Modal
          isOpen={isOpen}
          tree={tree}
          data={data}
          setTree={setTree}
          setIsOpen={setIsOpen}
        />
        {value ? (
          <div className="w-1/2 mt-10 ">
            <p className="font-extrabold text-2xl my-8">Detail Information</p>
            <div className="flex flex-col items-start border-gray-400 py-2 rounded-lg border-solid border-2">
              <p>
                <span className="text-lg font-bold mx-2 my-4">
                  Department Name
                </span>
                <span>{node?.title}</span>
              </p>
              <p>
                <span className="text-lg font-bold mx-2 my-4">Description</span>
                <span>{node?.description}</span>
              </p>
              <p>
                <span className="text-lg font-bold mx-2 my-4">
                  Managing Department :
                </span>
                <button
                  className={`${
                    node?.parent?.title
                      ? " bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      : "hidden"
                  }`}
                  onClick={() => {
                    onChange(node.parent.title);
                  }}
                >
                  {" "}
                  {node?.parent?.title || "null"}
                </button>
              </p>
              <p>
                <span className="text-lg font-bold mx-2 my-4">Manages</span>
                {node?.children?.map((ols: any) => {
                  return (
                    <>
                      <button
                        onClick={() => {
                          onChange(ols.title);
                        }}
                        className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        {ols.title}
                      </button>
                    </>
                  );
                })}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="my-5"></div>
    </div>
  );
}

export default App;
