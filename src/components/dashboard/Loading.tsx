import { ChevronDownIcon } from "@heroicons/react/24/outline"
import React from "react"

export const Loading = () => {
  return (
    <div className="mx-auto py-4 px-2 bg-slate-50 border rounded-lg drop-shadow-md">
      <div className="flex items-center justify-between px-2">
        <div className="w-full tabs pr-2">
          {[1, 2, 3, 4].map(() => (
            <div className="stat flex-1 bg-gray-100 rounded-2xl space-y-2 my-2 mx-1 py-4">
              <div className="h-8 w-1/2 bg-gray-200"></div>
              <div className="h-8 w-3/4 bg-gray-200"></div>
            </div>
          ))}
        </div>
        <div>
          <ChevronDownIcon className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
      <div className="mx-auto py-6 px-2">
        <div className="h-[400px] w-full bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  )
}