
export default function Roadmap() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#104735]">
            Roadmap Management
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your company roadmap and milestones.
          </p>
        </div>

        <button className="rounded-lg bg-[#104735] px-5 py-3 text-sm font-semibold text-white hover:bg-[#176348]">
          + Add Roadmap
        </button>
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-gray-300 p-10 text-center">
        <h3 className="font-semibold text-gray-700">
          No roadmap milestones added yet
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Your roadmap milestones will appear here.
        </p>
      </div>
    </div>
  );
}
