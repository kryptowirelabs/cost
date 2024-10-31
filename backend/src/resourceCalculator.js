// resourceCalculator.js

// Define empirical data for each VNF
const empiricalData = {
  AMF: {
    requestsPerMinute: [200, 300, 400, 500, 1000, 2000],
    cpuUsage: [0.5, 0.7, 0.9, 1.1, 2.2, 4.5],
    ramUsage: [0.5, 0.6, 0.8, 1.0, 1.8, 3.6],
  },
  SMF: {
    requestsPerMinute: [200, 300, 400, 500, 1000, 2000],
    cpuUsage: [0.6, 0.8, 1.0, 1.2, 2.5, 5.0],
    ramUsage: [0.6, 0.7, 0.9, 1.1, 2.0, 4.0],
  },
  NRF: {
    requestsPerMinute: [200, 300, 400, 500, 1000, 2000],
    cpuUsage: [0.6, 0.8, 1.0, 1.2, 2.5, 5.0],
    ramUsage: [0.6, 0.7, 0.9, 1.1, 2.0, 4.0],
  },
  AUSF: {
    requestsPerMinute: [200, 300, 400, 500, 1000, 2000],
    cpuUsage: [0.6, 0.8, 1.0, 1.2, 2.5, 5.0],
    ramUsage: [0.6, 0.7, 0.9, 1.1, 2.0, 4.0],
  },
  UDM: {
    requestsPerMinute: [200, 300, 400, 500, 1000, 2000],
    cpuUsage: [0.6, 0.8, 1.0, 1.2, 2.5, 5.0],
    ramUsage: [0.6, 0.7, 0.9, 1.1, 2.0, 4.0],
  },
  UDR: {
    requestsPerMinute: [200, 300, 400, 500, 1000, 2000],
    cpuUsage: [0.6, 0.8, 1.0, 1.2, 2.5, 5.0],
    ramUsage: [0.6, 0.7, 0.9, 1.1, 2.0, 4.0],
  },
  UPF: {
    dataVolume: [10, 20, 50, 100, 500, 1000], 
    cpuUsage: [0.4, 0.6, 1.2, 1.8, 3.0, 6.0],
    ramUsage: [0.4, 0.5, 0.9, 1.3, 2.3, 4.5],
  },
};

// Reference VM details (AWS t4g.small EC2 instance)
const referenceVm = {
  vCPU: 2,
  ram: 2, // In GiB
  costPerHour: 0.0168, // USD per hour
};

// Linear interpolation and extrapolation function
function interpolateOrExtrapolate(x, xPoints, yPoints) {
  if (x <= xPoints[0]) {
    const slope = (yPoints[1] - yPoints[0]) / (xPoints[1] - xPoints[0]);
    return yPoints[0] + slope * (x - xPoints[0]);
  } else if (x >= xPoints[xPoints.length - 1]) {
    const slope = (yPoints[yPoints.length - 1] - yPoints[yPoints.length - 2]) / 
                  (xPoints[xPoints.length - 1] - xPoints[xPoints.length - 2]);
    return yPoints[yPoints.length - 1] + slope * (x - xPoints[xPoints.length - 1]);
  } else {
    for (let i = 0; i < xPoints.length - 1; i++) {
      if (x >= xPoints[i] && x <= xPoints[i + 1]) {
        const slope = (yPoints[i + 1] - yPoints[i]) / (xPoints[i + 1] - xPoints[i]);
        return yPoints[i] + slope * (x - xPoints[i]);
      }
    }
  }
  return yPoints[yPoints.length - 1];
}

// Function to calculate resource requirements and cost based on VNF type
function calculateResourceRequirements(vnfDetails) {
  const requirements = {};

  Object.keys(vnfDetails).forEach((vnf) => {
    const vnfData = empiricalData[vnf];
    const measurementType = vnf === "UPF" ? "dataVolume" : "requestsPerMinute";
    const inputRate = parseInt(vnfDetails[vnf][measurementType], 10);
    const instanceCount = parseInt(vnfDetails[vnf].instanceCount, 10) || 1;

    if (!isNaN(inputRate) && inputRate > 0 && vnfData) {
      const estimatedCpu = interpolateOrExtrapolate(inputRate, vnfData[measurementType], vnfData.cpuUsage);
      const estimatedRam = interpolateOrExtrapolate(inputRate, vnfData[measurementType], vnfData.ramUsage);

      const vmCpuCount = Math.ceil(estimatedCpu / referenceVm.vCPU);
      const vmRamCount = Math.ceil(estimatedRam / referenceVm.ram);
      const vmCount = Math.max(vmCpuCount, vmRamCount);

      const totalCostPerHour = vmCount * referenceVm.costPerHour * instanceCount;

      requirements[vnf] = {
        estimatedCpu: (estimatedCpu * instanceCount).toFixed(2),
        estimatedRam: (estimatedRam * instanceCount).toFixed(2),
        vmCount: vmCount,
        totalCostPerHour: totalCostPerHour.toFixed(4),
      };
    }
  });

  return requirements;
}

module.exports = { calculateResourceRequirements };
