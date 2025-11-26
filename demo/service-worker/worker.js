console.log("[Worker] Data processing Web Worker initializing...");

// Listen for messages from main thread
self.addEventListener("message", (event) => {
  const { type, data } = event.data;
  console.log("🚀 ~ Worker received data:", data);

  if (type === "PROCESS_DATA") {
    console.log("[Worker] Received data processing request...");

    const stats = processData(data);
    console.log("🚀 ~ Worker computed stats:", stats);

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

  console.log("[Worker] Processing", dataArray.length, "data points...");
  const startTime = Date.now();

  let totalSteps = 0;
  let totalCalories = 0;
  let minHR = dataArray[0].heartRate;
  let maxHR = dataArray[0].heartRate;
  let totalHR = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const point = dataArray[i];
    totalSteps += point.steps;
    totalCalories += point.calories;
    totalHR += point.heartRate;
    if (point.heartRate < minHR) minHR = point.heartRate;
    if (point.heartRate > maxHR) maxHR = point.heartRate;
  }

  const avgHR = (totalHR / dataArray.length).toFixed(1);
  const avgSteps = (totalSteps / dataArray.length).toFixed(0);

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

  const maxStepsDay = dataArray.reduce((max, current) =>
    current.steps > max.steps ? current : max,
  );

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
  console.log("[Worker] Processing completed in", processingTime, "ms");

  return {
    totalPoints: dataArray.length,
    totalSteps: totalSteps,
    totalCalories: totalCalories,
    avgSteps: avgSteps,
    avgHeartRate: avgHR,
    minHeartRate: minHR,
    maxHeartRate: maxHR,
    activityBreakdown: activityLevels,
    mostActiveDay: {
      date: maxStepsDay.date,
      steps: maxStepsDay.steps,
    },
    trend: trend,
    processingTimeMs: processingTime,
  };
}

console.log("[Worker] Ready for data processing");
