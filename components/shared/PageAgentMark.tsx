import SectionPortrait from "@/components/shared/SectionPortrait";

/**
 * Inner-page portrait under the navbar so every route shows Dr. Jan Duffy’s mark.
 */
export default function PageAgentMark() {
  return (
    <div className="flex justify-center px-4 pt-2 pb-2">
      <SectionPortrait
        className="mb-0"
        sizeClassName="h-24 w-24 sm:h-28 sm:w-28"
      />
    </div>
  );
}
