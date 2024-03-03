export default function Grid() {
  return (
    <div>
      <div className="flex flex-col gap-4 bg-gray-100 p-10">
        <div className="h-10 w-10 rounded-full bg-red-500"></div>
        <div className="h-10 w-10 rounded-full bg-yellow-500"></div>
        <div className="h-10 w-10 rounded-full bg-green-500"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-200 p-10">
        <div className="col-span-2 h-10 bg-red-500"></div>
        <div className="h-10 bg-red-500"></div>
        <div className="h-10 bg-red-500"></div>
        <div className="h-10 bg-red-500"></div>
        <div className="h-10 bg-red-500"></div>
        <div className="h-10 bg-red-500"></div>
      </div>
    </div>
  )
}
