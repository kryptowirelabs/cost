// vnfProcessMapping.js

const vnfProcessMapping = {
  AMF: {
    'Registration': [{ procedure: 'VNF Registration with NRF', indexEntry: '3' }],
    'UE Registration': [{ procedure: 'UE Registration', indexEntry: '1' }],
    'Mutual Authentication': [{ procedure: 'Mutual Authentication', indexEntry: '1' }],
    'Session Setup': [
      { procedure: 'Session Setup', indexEntry: '1' },
      { procedure: 'Session Setup', indexEntry: '2' },
      { procedure: 'Session Setup', indexEntry: '6' }
    ],
  },
  SMF: {
    'VNF Registration with NRF': [{ procedure: 'VNF Registration with NRF', indexEntry: '2' }],
    'VNF Discovery from NRF': [{ procedure: 'VNF Discovery from NRF', indexEntry: '2' }],
    'Session Setup': [
      { procedure: 'Session Setup', indexEntry: '3' },
      { procedure: 'Session Setup', indexEntry: '4' },
      { procedure: 'Session Setup', indexEntry: '5' }
    ],
  },
  UPF: {
    'VNF Registration with NRF': [{ procedure: 'VNF Registration with NRF', indexEntry: '1' }],
    'VNF Metadata Update to NRF': [{ procedure: 'VNF Metadata Update to NRF', indexEntry: '3' }]
  },
  // Add other VNFs similarly...
};

module.exports = vnfProcessMapping;
