import { createSignal } from "solid-js";

export default function Calculator() {
  const [fileSize, setFileSize] = createSignal(2);
  const [conversions, setConversions] = createSignal(50_000);

  const AVERAGE_RUN_TIME = 2;
  const PER_MB = 0.0008;
  const PER_SECOND = 0.00002;
  const COMPETITOR_PER_MB = 0.001;
  const COMPETITOR_PER_SECOND = 0.00019551;

  const cost = () =>
    conversions() * (AVERAGE_RUN_TIME * PER_SECOND + fileSize() * PER_MB);
  const competitorCost = () =>
    conversions() *
    (AVERAGE_RUN_TIME * COMPETITOR_PER_SECOND + fileSize() * COMPETITOR_PER_MB);

  return (
    <div class="py-12 h-fit flex flex-col justify-center items-center">
      <h1 class="font-semibold text-3xl tracking-tight">Pricing Calculator</h1>
      <div class="flex flex-col justify-center items-center text-sm text-gray-500 gap-2 my-8">
        <span>
          * Assuming an average execution time of{" "}
          <strong>{AVERAGE_RUN_TIME} seconds.</strong>
        </span>
        <span>
          Price per MB: <strong>{PER_MB} USD</strong>
        </span>
        <span>
          Price per Second of Computation: <strong>{PER_SECOND} USD</strong>
        </span>
      </div>
      <div class="flex flex-col justify-center items-start mb-4">
        <label for="conversions">
          Number of Conversions: <strong>{conversions()}/mo</strong>
        </label>
        <input
          id="conversions"
          class="min-w-[30rem]"
          type="range"
          min="1"
          max="100000"
          value={conversions()}
          onInput={(e) => setConversions(+e.target.value)}
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label for="filesize">
          Average File Size: <strong>{fileSize()} MB</strong>
        </label>
        <input
          id="filesize"
          class="min-w-[30rem]"
          type="range"
          min="1"
          max="100"
          value={fileSize()}
          onInput={(e) => setFileSize(+e.target.value)}
        />
      </div>
      <div class="flex flex-col justify-center items-center mt-8 gap-2">
        <span class="text-sm">
          Estimated Monthly Cost:{" "}
          <strong class="text-base text-green-600">
            $ {cost().toFixed(2)} USD
          </strong>
        </span>
        <span class="text-sm">
          Closest Competitor Monthly Cost:{" "}
          <strong class="text-base text-red-600">
            $ {competitorCost().toFixed(2)} USD
          </strong>
        </span>
      </div>
    </div>
  );
}
