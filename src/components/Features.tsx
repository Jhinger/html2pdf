import FeatureBlock from "@/components/FeatureBlock";

export default function Features() {
  return (
    <div class="w-full h-fit py-12 flex justify-center items-center">
      <div class="grid grid-cols-3 grid-rows-2 place-items-center gap-8">
        <FeatureBlock />
        <FeatureBlock />
        <FeatureBlock />
        <FeatureBlock />
        <FeatureBlock />
        <FeatureBlock />
      </div>
    </div>
  );
}
