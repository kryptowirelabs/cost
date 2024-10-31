// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getProcedures } = require("./5gProcedures");
const { calculateProcedureLatency } = require("./latencyCalculator");
const { calculateLatencyForProcess } = require("./vnfLatencyCalculator");
const { calculateResourceRequirements } = require("./resourceCalculator");

const app = express();
const PORT = 5001;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// State to store data from frontend
let state = {
  regions: {
    WZ: [],
    LZ: [],
    AZ: [],
  },
  locationWZ: "",
  locationLZ: "",
  locationAZ: "",
  activeZone: "",
  vnfLocations: {},
  vnfDetails: {},
};

// List of all required VNFs
const requiredVnfs = ["AMF", "SMF", "UPF", "NRF", "UDR", "UDM", "AUSF"];

const areAllVnfsAssigned = () => {
  const assignedVnfs = Object.keys(state.vnfLocations);
  const unassignedVnfs = requiredVnfs.filter((vnf) => !assignedVnfs.includes(vnf));
  return unassignedVnfs.length === 0;
};

const recalculateLatencies = () => {
  const procedures = getProcedures();
  const vnfLocations = state.vnfLocations;
  procedures.forEach((procedure) => {
    console.log(`----${procedure.name}----`)
    procedure.steps.forEach((step, index) => {
      const { from, to, endpoint, computationTime } = step;
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
        const totalLatency = interSiteLatency + randomComputationTime;
        console.log(
          `Step ${index + 1}: ${from} to ${to}, ${endpoint}, Total Latency: ${totalLatency.toFixed(1)} ms`
        );
      }
    });
    console.log(``);
  });
};

// Endpoint to receive updated region data
app.post("/apply-updates", (req, res) => {
  const { regions, locations } = req.body;
  if (regions) {
    state.regions = regions;
    Object.keys(state.regions).forEach((region) => {
      state.regions[region].forEach((vnf) => {
        const location = locations[region];
        if (location) {
          state.vnfLocations[vnf] = { location, zoneType: region };
        }
      });
    });
  }

  if (areAllVnfsAssigned()) {
    recalculateLatencies();
  } else {
    console.log(`Not all VNFs are assigned yet`)
  }

  res.sendStatus(200);
});

// Endpoint to receive updated VNF details
app.post("/update-vnf-details", (req, res) => {
  const vnfDetails = req.body;
  state.vnfDetails = { ...state.vnfDetails, ...vnfDetails };
  const resourceRequirements = calculateResourceRequirements(state.vnfDetails);
  res.json({ resourceRequirements });
});

// Endpoint to get calculated latency data for overlay
app.post("/get-latency-data", (req, res) => {
  const { vnfLocations } = req.body;
  const latencyData = {};
  const procedures = getProcedures();

  procedures.forEach((procedure) => {
    latencyData[procedure.name] = procedure.steps.map((step) => {
      const { from, to, endpoint, computationTime } = step;
      const locationFrom = vnfLocations[from];
      const locationTo = vnfLocations[to];
      const interSiteLatency = calculateProcedureLatency(
        locationFrom.location,
        locationFrom.zoneType,
        locationTo.location,
        locationTo.zoneType
      );
      const randomComputationTime =
        Math.round((Math.random() * (computationTime.max - computationTime.min) + computationTime.min) * 10) / 10;
      const totalLatency = interSiteLatency + randomComputationTime;

      return {
        from,
        to,
        endpoint,
        latency: totalLatency,
      };
    });
  });

  res.json(latencyData);
});

app.post("/get-process-latency", (req, res) => {
  const { vnfLocations, vnf, processName } = req.body;

  if (!vnf || !processName) {
    return res.status(400).json({ error: "VNF and process name are required" });
  }

  console.log(`Calculating latency for VNF: ${vnf}, Process: ${processName}`);

  const totalLatency = calculateLatencyForProcess(vnfLocations, vnf, processName);

  res.json({ latency: totalLatency });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
