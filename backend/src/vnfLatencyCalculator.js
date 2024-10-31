// vnfLatencyCalculator.js
const { getProcedures } = require("./5gProcedures");
const { calculateProcedureLatency } = require("./latencyCalculator");
const vnfProcessMapping = require("./vnfProcessMapping");

const calculateLatencyForProcess = (vnfLocations, vnf, processName) => {
  const procedures = getProcedures();
  const processes = vnfProcessMapping[vnf] || {};
  const stepMappings = processes[processName] || [];

  let totalLatencyForProcess = 0;

  console.log(`Calculating latency for VNF "${vnf}", Process "${processName}"`);

  stepMappings.forEach(({ procedure, indexEntry }) => {
    const proc = procedures.find((p) => p.name === procedure);
    if (proc) {
      const step = proc.steps.find((s) => s.indexEntry === indexEntry);
      if (step) {
        const { from, to, computationTime } = step;
        const locationFrom = vnfLocations[from];
        const locationTo = vnfLocations[to];

        if (locationFrom && locationTo) {
          const interSiteLatency = calculateProcedureLatency(
            locationFrom.location,
            locationFrom.zoneType,
            locationTo.location,
            locationTo.zoneType
          );
          const randomComputationTime =
            Math.round((Math.random() * (computationTime.max - computationTime.min) + computationTime.min) * 10) / 10;

          totalLatencyForProcess += interSiteLatency + randomComputationTime;

          console.log(`Step: From "${from}" to "${to}", Latency: ${interSiteLatency} ms, Computation Time: ${randomComputationTime} ms`);
        } else {
          console.warn(`Warning: Missing location information for "${from}" or "${to}". Skipping this step.`);
        }
      } else {
        console.warn(`Warning: Step with indexEntry "${indexEntry}" not found in procedure "${procedure}"`);
      }
    } else {
      console.warn(`Warning: Procedure "${procedure}" not found for VNF "${vnf}"`);
    }
  });

  console.log(`Total Latency for Process "${processName}" in VNF "${vnf}": ${totalLatencyForProcess} ms`);
  return totalLatencyForProcess;
};

module.exports = { calculateLatencyForProcess };
