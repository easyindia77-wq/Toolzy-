export default function Loader() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-8">
      <div className="loader" />

      <p className="text-gray-400 mt-4 text-sm animate-pulse">
        Processing your file, please wait...
      </p>
    </div>
  );
}
