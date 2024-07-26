function Logo() {
  return (
    <div className="flex gap-4 items-center">
      <div className="shades flex gap-1">
        <div className="div bg-purple-500 w-2 h-[2.5rem] rounded-md"></div>
        <div className="div bg-purple-600 w-2 h-[2.5rem] rounded-md"></div>
        <div className="div bg-purple-700 w-2 h-[2.5rem] rounded-md"></div>
      </div>
      <h1 className="text-custom-text-1 text-5xl font-bold">kanban</h1>
    </div>
  );
}

export default Logo;
