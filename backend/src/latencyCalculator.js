// latencyCalculator.js

const interSiteLatencies = {
  "US-East: N. Virginia": {
    WZ: { Atlanta: 10, NYC: 10, Chicago: 12 },
    LZ: { Atlanta: 10, NYC: 10, Chicago: 12 }
  },
  // Additional regions...
};

const getInterSiteLatency = (locationFrom, zoneTypeFrom, locationTo, zoneTypeTo) => {
  if (interSiteLatencies[locationFrom] && interSiteLatencies[locationFrom][zoneTypeTo] &&
                                          interSiteLatencies[locationFrom][zoneTypeTo][locationTo]) {
    return interSiteLatencies[locationFrom][zoneTypeTo][locationTo];
  } else if (interSiteLatencies[locationTo] && interSiteLatencies[locationTo][zoneTypeFrom] &&
                                                interSiteLatencies[locationTo][zoneTypeFrom][locationFrom]) {
    return interSiteLatencies[locationTo][zoneTypeFrom][locationFrom];
  }
  return 0.5; // Default latency for undefined paths
};

const calculateProcedureLatency = (locationFrom, zoneTypeFrom, locationTo, zoneTypeTo) => {
  return getInterSiteLatency(locationFrom, zoneTypeFrom, locationTo, zoneTypeTo);
};

module.exports = { calculateProcedureLatency };
