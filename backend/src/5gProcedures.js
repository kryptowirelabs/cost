// 5gProcedures.js
// Deterministic list of 5G core procedures between VNFs

const procedures = [
  {
    name: 'VNF Registration with NRF',
    steps: [
      {indexEntry: '1', from: 'UPF', to: 'NRF', endpoint: 'PUT /nnrf-nfm/v1/nf-instances/{id}', computationTime: { min: 1, max: 3 } },
      {indexEntry: '2', from: 'SMF', to: 'NRF', endpoint: 'PUT /nnrf-nfm/v1/nf-instances/{id}', computationTime: { min: 1, max: 3 } },
      {indexEntry: '3', from: 'AMF', to: 'NRF', endpoint: 'PUT /nnrf-nfm/v1/nf-instances/{id}', computationTime: { min: 1, max: 3 } }
    ]
  },
  {
    name: 'VNF Discovery from NRF',
    steps: [
      {indexEntry: '1', from: 'AMF', to: 'NRF', endpoint: 'GET /nnrf-disc/v1/nf-instances?target-nf-type={target}&requester-nf-type={requester}', computationTime: { min: 1, max: 3 } },
      {indexEntry: '2', from: 'SMF', to: 'NRF', endpoint: 'GET /nnrf-disc/v1/nf-instances?target-nf-type={target}&requester-nf-type={requester}', computationTime: { min: 1, max: 3 } }
    ]
  },
  {
    name: 'VNF Metadata Update to NRF',
    steps: [
      {indexEntry: '1', from: 'AMF', to: 'NRF', endpoint: 'POST /nnrf-nfm/v1/nf-instances/{id}/status-notify', computationTime: { min: 20, max: 35 } },
      {indexEntry: '2', from: 'SMF', to: 'NRF', endpoint: 'POST /nnrf-nfm/v1/nf-instances/{id}/status-notify', computationTime: { min: 15, max: 25 } },
      {indexEntry: '3', from: 'UPF', to: 'NRF', endpoint: 'POST /nnrf-nfm/v1/nf-instances/{id}/status-notify', computationTime: { min: 20, max: 40 } }
    ]
  },
  {
    name: 'UE Registration',
    steps: [
      {indexEntry: '1', from: 'AMF', to: 'AUSF', endpoint: 'POST /nausf-auth/v1/ue-authentications', computationTime: { min: 20, max: 25 } },
      {indexEntry: '2', from: 'AUSF', to: 'UDM', endpoint: 'POST /nudm-ueau/v1/imsi/security-information/generate-auth-data', computationTime: { min: 50, max: 80 } },
      {indexEntry: '3', from: 'UDM', to: 'UDR', endpoint: 'GET /nudr-dr/v1/subscription-data/{imsi}/authentication-subscription', computationTime: { min: 25, max: 45 } },
      {indexEntry: '4', from: 'UDR', to: 'UDM', endpoint: 'PATCH /nudr-dr/v1/subscription-data/{imsi}/authentication-data', computationTime: { min: 10, max: 30 } },
      {indexEntry: '5', from: 'UDM', to: 'AUSF', endpoint: 'Response: KAUSF, HE AV', computationTime: { min: 20, max: 40 } },
      {indexEntry: '6', from: 'AUSF', to: 'AMF', endpoint: 'Response: SE AV, KSEAF', computationTime: { min: 0, max: 1 } }
    ]
  },
  {
    name: 'Mutual Authentication',
    steps: [
      {indexEntry: '1', from: 'AMF', to: 'AUSF', endpoint: 'PUT /nausf-auth/v1/ue-authentications/{id}/5g-aka-confirmation', computationTime: { min: 15, max: 20 } },
      {indexEntry: '2', from: 'AUSF', to: 'UDM', endpoint: 'POST /nudm-ueau/v1/imsi/auth-events', computationTime: { min: 20, max: 40 } },
      {indexEntry: '3', from: 'UDM', to: 'UDR', endpoint: 'GET /nudr-dr/v1/subscription-data/{imsi}/authentication-data', computationTime: { min: 25, max: 50 } },
      {indexEntry: '4', from: 'UDM', to: 'UDR', endpoint: 'PUT /nudr-dr/v1/subscription-data/{imsi}/authentication-data', computationTime: { min: 10, max: 35 } }
    ]
  },
  {
    name: 'Session Setup',
    steps: [
      {indexEntry: '1', from: 'AMF', to: 'NRF', endpoint: 'GET /nnrf-disc/v1/nf-instances?target-nf-type=SMF&requester-nf-type=AMF', computationTime: { min: 30, max: 50 } },
      {indexEntry: '2', from: 'AMF', to: 'SMF', endpoint: 'POST /nsmf-pdusession/v1/sm-contexts', computationTime: { min: 40, max: 70 } },
      {indexEntry: '3', from: 'SMF', to: 'NRF', endpoint: 'GET /nnrf-disc/v1/nf-instances?target-nf-type=UPF&requester-nf-type=SMF', computationTime: { min: 25, max: 45 } },
      {indexEntry: '4', from: 'SMF', to: 'UPF', endpoint: 'POST /nsmf-pdusession/v1/sm-contexts/modify', computationTime: { min: 35, max: 60 } },
      {indexEntry: '5', from: 'SMF', to: 'AMF', endpoint: 'POST /namf-comm/v1/ue-contexts/imsi-#imsi/n1n2-messages', computationTime: { min: 20, max: 40 } },
      {indexEntry: '6', from: 'AMF', to: 'SMF', endpoint: 'POST /nsmf-pdusession/v1/sm-contexts/modify', computationTime: { min: 25, max: 50 } }
    ]
  }
];

// Function to get the list of procedures
const getProcedures = () => procedures;


module.exports = { getProcedures };
