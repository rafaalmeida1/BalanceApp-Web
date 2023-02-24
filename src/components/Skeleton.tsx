export function Skeleton() {
  return (
    <section className="flex flex-col sm:flex-row gap-5 sm:gap-20 items-center justify-between w-full h-full">
      <div className="sm:w-1/3 w-full h-1/2 sm:h-full border border-gray-800 bg-gray-800 rounded-lg shadow-xl shadow-black relative pt-4 flex flex-col gap-1 sm:gap-4 items-center justify-between"></div>

      <div className="w-full h-full border border-gray-800 bg-gray-800 rounded-lg shadow-xl shadow-black overflow-auto"></div>
    </section>
  );
}
