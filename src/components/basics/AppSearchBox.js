import { IoIosSearch } from 'react-icons/io'
// import React from 'react'

export default function AppSearchBox({ handleSearch, ...otherProps }) {
  return (
    <div className="w-full -z-1 flex items-center justify-start h-12">
      <form className="h-full w-full">
        <div className="flex relative w-full">
          <input
            type={'search'}
            className="text-base outline-none bg-white pl-4 rounded-l-lg text-dark-grey text-sm border border-l-1 border-y-1 block text-start w-11/12"
            {...otherProps}
          />
          <button
            type="button"
            className="h-12 w-12 bg-theme-primary-main text-center rounded-r-lg cursor-pointer text-xl flex justify-center items-center"
            onClick={handleSearch}
          >
            <IoIosSearch color="white" />
          </button>
        </div>
      </form>
    </div>
  )
}
