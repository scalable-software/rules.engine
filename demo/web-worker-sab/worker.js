console.log("[Worker SAB] Initializing...");

self.addEventListener("message", (event) => {
  const { type, buffer } = event.data;

  if (type === "PROCESS_DATA") {
    console.log("[Worker SAB] Received SharedArrayBuffer");

    const view = new Int32Array(buffer);
    const count = view[0];

    console.log(`[Worker SAB] Processing ${count} records...`);

    // Parse data from buffer
    const dataArray = [];
    let offset = 1;
    for (let i = 0; i < count; i++) {
      dataArray.push({
        steps: view[offset++],
        calories: view[offset++],
        heartRate: view[offset++],
      });
    }

    // Process data (same logic as before)
    const stats = processData(dataArray);
    console.log("[Worker SAB] Stats computed:", stats);

    // Send result back to main thread
    self.postMessage({
      type: "STATS_READY",
      stats: stats,
    });
  }
});

function processData(dataArray) {
  if (!dataArray || dataArray.length === 0) {
    return { error: "No data" };
  }

  const startTime = Date.now();

  let totalSteps = 0;
  let totalCalories = 0;
  let minHR = dataArray[0].heartRate;
  let maxHR = dataArray[0].heartRate;
  let totalHR = 0;
  let maxSteps = 0;

  // Calculate totals and ranges
  for (let i = 0; i < dataArray.length; i++) {
    const point = dataArray[i];
    totalSteps += point.steps;
    totalCalories += point.calories;
    totalHR += point.heartRate;

    if (point.steps > maxSteps) maxSteps = point.steps;
    if (point.heartRate < minHR) minHR = point.heartRate;
    if (point.heartRate > maxHR) maxHR = point.heartRate;
  }

  const avgHR = (totalHR / dataArray.length).toFixed(1);
  const avgSteps = (totalSteps / dataArray.length).toFixed(0);

  // Activity level breakdown
  const activityLevels = {
    sedentary: 0, // < 5000 steps
    light: 0, // 5000-7500
    moderate: 0, // 7500-10000
    active: 0, // 10000+
  };

  dataArray.forEach((point) => {
    if (point.steps < 5000) activityLevels.sedentary++;
    else if (point.steps < 7500) activityLevels.light++;
    else if (point.steps < 10000) activityLevels.moderate++;
    else activityLevels.active++;
  });

  // Calculate trend (first half vs second half)
  const midPoint = Math.floor(dataArray.length / 2);
  const firstHalf = dataArray.slice(0, midPoint);
  const secondHalf = dataArray.slice(midPoint);

  const firstHalfAvg =
    firstHalf.reduce((sum, p) => sum + p.steps, 0) / firstHalf.length;
  const secondHalfAvg =
    secondHalf.reduce((sum, p) => sum + p.steps, 0) / secondHalf.length;

  const trend =
    secondHalfAvg > firstHalfAvg
      ? "Increasing ↑"
      : secondHalfAvg < firstHalfAvg
        ? "Decreasing ↓"
        : "Stable →";

  const processingTime = Date.now() - startTime;
  console.log("[Worker SAB] Processing completed in", processingTime, "ms");

  return {
    totalPoints: dataArray.length,
    totalSteps: totalSteps,
    totalCalories: totalCalories,
    avgSteps: avgSteps,
    avgHeartRate: avgHR,
    minHeartRate: minHR,
    maxHeartRate: maxHR,
    maxSteps: maxSteps,
    activityBreakdown: activityLevels,
    trend: trend,
    processingTimeMs: processingTime,
  };
}

console.log("[Worker SAB] Ready for SharedArrayBuffer processing");
