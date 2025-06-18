import React from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const EditTodos = ({open,setOpen,todoTitle,todoDesc}) => {


  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900 mb-4"
                  >
                    Edit Todo
                  </DialogTitle>
                  <div className="flex mb-4">
                    <input
                      onChange={(e) => {
                        setTodoTitle(e.target.value);
                      }}
                      className="bg-gray-300 w-full rounded-lg px-1 py-2 m-1 border-none"
                      type="text"
                      placeholder="Add title..."
                      value={todoTitle}
                    />
                    <input
                      onChange={(e) => {
                        setTodoDesc(e.target.value);
                      }}
                      className="bg-gray-300 w-full rounded-lg px-1 m-1 border-none"
                      type="text"
                      placeholder="Add description..."
                      value={todoDesc}
                    />
                  </div>

                  <div className="flex justify-between mb-3 px-2">
                    <button
                      type="submit"
                      className="bg-blue-600 rounded text-white py-2 px-4 font-semibold hover:bg-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="bg-gray-800 rounded text-white py-2 px-4 font-semibold hover:bg-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default EditTodos
