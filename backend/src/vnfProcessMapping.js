// vnfProcessMapping.js

const vnfProcessMapping = {
  AMF: {
    'Registration': [{ procedure: 'VNF Registration with NRF', indexEntry: '3' }],
    'SMF Discovery': [{ procedure: 'VNF Discovery from NRF', indexEntry: '1' },],
    '': [{ procedure: 'Mutual Authentication', indexEntry: '1' }],
    '5G-AKA - Serving Network Only': [
      { procedure: 'UE Registration', indexEntry: '1' },
      //{ procedure: 'UE Registration', indexEntry: '5' },
      //{ procedure: 'UE Registration', indexEntry: '6' },
      { procedure: 'Mutual Authentication', indexEntry: '1' }
    ],
    'End-to-end 5G-AKA': [
      { procedure: 'UE Registration', indexEntry: '1' },
      { procedure: 'UE Registration', indexEntry: '2' },
      { procedure: 'UE Registration', indexEntry: '3' },
      { procedure: 'UE Registration', indexEntry: '4' },
      //{ procedure: 'UE Registration', indexEntry: '5' },
      //{ procedure: 'UE Registration', indexEntry: '6' },
      { procedure: 'Mutual Authentication', indexEntry: '1' },
      { procedure: 'Mutual Authentication', indexEntry: '2' },
      { procedure: 'Mutual Authentication', indexEntry: '3' },
      { procedure: 'Mutual Authentication', indexEntry: '4' },
    ],
  },
  // TODO: Add other VNFs...
};

module.exports = vnfProcessMapping;
