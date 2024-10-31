const vnfProcedures = {
  AMF: [
    {
      name: "Registration",
      steps: [
        { from: "AMF", to: "NRF", endpoint: "PUT /nnrf-nfm/v1/nf-instances/#id", positionTop: 100, positionLeft: 150 },
        { from: "NRF", to: "AMF", endpoint: "/nnrf-nfm/v1/nf-instances/{id}/status Response", positionTop: 200, positionLeft: 300 },
      ]
    },
    {
      name: "Session Management",
      steps: [
        { from: "AMF", to: "SMF", endpoint: "POST /nsmf-session/v1/sm-contexts", positionTop: 150, positionLeft: 200 },
        { from: "SMF", to: "UPF", endpoint: "GET /nsmf-pdusession/v1/sm-contexts", positionTop: 250, positionLeft: 350 },
        { from: "AMF", to: "AUSF", endpoint: "POST /nausf-auth/v1/authentication", positionTop: 300, positionLeft: 450 },
      ]
    },
    {
      name: "Authentication",
      steps: [
        { from: "AMF", to: "AUSF", endpoint: "POST /nausf-auth/v1/ue-authentications", positionTop: 120, positionLeft: 180 },
        { from: "AUSF", to: "UDM", endpoint: "GET /nudm-ueau/v1/imsi/security-information", positionTop: 220, positionLeft: 280 },
        { from: "UDM", to: "UDR", endpoint: "GET /nudr-dr/v1/subscription-data/{imsi}/auth", positionTop: 320, positionLeft: 380 },
      ]
    },
  ],
  SMF: [
    {
      name: "Session Setup",
      steps: [
        { from: "SMF", to: "UPF", endpoint: "POST /nsmf-pdusession/v1/sm-contexts", positionTop: 130, positionLeft: 210 },
        { from: "UPF", to: "NRF", endpoint: "GET /nnrf-disc/v1/nf-instances", positionTop: 230, positionLeft: 310 },
        { from: "SMF", to: "AMF", endpoint: "POST /namf-comm/v1/ue-contexts", positionTop: 330, positionLeft: 410 },
      ]
    },
    {
      name: "PDU Session Management",
      steps: [
        { from: "SMF", to: "UPF", endpoint: "POST /nsmf-pdusession/v1/sm-contexts/modify", positionTop: 140, positionLeft: 220 },
        { from: "UPF", to: "SMF", endpoint: "PATCH /nsmf-pdusession/v1/sm-contexts", positionTop: 240, positionLeft: 320 },
        { from: "SMF", to: "AMF", endpoint: "POST /namf-comm/v1/ue-contexts", positionTop: 340, positionLeft: 420 },
      ]
    },
  ],
  UPF: [
    {
      name: "Data Forwarding",
      steps: [
        { from: "UPF", to: "SMF", endpoint: "POST /nsmf-pdusession/v1/sm-contexts/update", positionTop: 160, positionLeft: 240 },
        { from: "UPF", to: "NRF", endpoint: "GET /nnrf-disc/v1/nf-instances", positionTop: 260, positionLeft: 340 },
        { from: "SMF", to: "AMF", endpoint: "POST /namf-comm/v1/ue-contexts", positionTop: 360, positionLeft: 440 },
      ]
    },
    {
      name: "QoS Management",
      steps: [
        { from: "UPF", to: "AMF", endpoint: "PATCH /namf-comm/v1/ue-contexts", positionTop: 170, positionLeft: 250 },
        { from: "SMF", to: "UPF", endpoint: "POST /nsmf-pdusession/v1/sm-contexts/modify", positionTop: 270, positionLeft: 350 },
        { from: "UPF", to: "SMF", endpoint: "GET /nsmf-pdusession/v1/sm-contexts", positionTop: 370, positionLeft: 450 },
      ]
    },
  ],
  NRF: [
    {
      name: "NF Registration",
      steps: [
        { from: "NRF", to: "AMF", endpoint: "PUT /nnrf-nfm/v1/nf-instances", positionTop: 180, positionLeft: 260 },
        { from: "NRF", to: "SMF", endpoint: "GET /nnrf-nfm/v1/nf-instances", positionTop: 280, positionLeft: 360 },
        { from: "NRF", to: "UDM", endpoint: "POST /nudm-sdm/v1/sd-contexts", positionTop: 380, positionLeft: 460 },
      ]
    },
    {
      name: "NF Discovery",
      steps: [
        { from: "NRF", to: "UPF", endpoint: "GET /nnrf-disc/v1/nf-instances", positionTop: 190, positionLeft: 270 },
        { from: "NRF", to: "AMF", endpoint: "POST /namf-comm/v1/ue-contexts", positionTop: 290, positionLeft: 370 },
      ]
    },
  ],
  UDR: [
    {
      name: "Data Storage",
      steps: [
        { from: "UDR", to: "UDM", endpoint: "PUT /nudr-dr/v1/subscription-data", positionTop: 200, positionLeft: 280 },
        { from: "UDR", to: "AMF", endpoint: "POST /namf-comm/v1/ue-contexts", positionTop: 300, positionLeft: 380 },
      ]
    },
    {
      name: "Subscription Management",
      steps: [
        { from: "UDR", to: "SMF", endpoint: "GET /nudr-dr/v1/sm-data", positionTop: 210, positionLeft: 290 },
        { from: "SMF", to: "UDR", endpoint: "PATCH /nudr-dr/v1/sm-data", positionTop: 310, positionLeft: 390 },
      ]
    },
  ],
  UDM: [
    {
      name: "User Profile Handling",
      steps: [
        { from: "UDM", to: "AUSF", endpoint: "POST /nudm-ueau/v1/auth", positionTop: 220, positionLeft: 300 },
        { from: "UDM", to: "AMF", endpoint: "GET /nudm-ueau/v1/subscription-data", positionTop: 320, positionLeft: 400 },
      ]
    },
    {
      name: "Subscription Data Retrieval",
      steps: [
        { from: "UDM", to: "NRF", endpoint: "POST /nnrf-disc/v1/nf-instances", positionTop: 230, positionLeft: 310 },
        { from: "NRF", to: "UDM", endpoint: "GET /nnrf-nfm/v1/nf-instances", positionTop: 330, positionLeft: 410 },
      ]
    },
  ],
  AUSF: [
    {
      name: "Authentication Request Handling",
      steps: [
        { from: "AUSF", to: "AMF", endpoint: "POST /nausf-auth/v1/ue-authentications", positionTop: 240, positionLeft: 320 },
        { from: "AMF", to: "AUSF", endpoint: "GET /nausf-auth/v1/ue-authentications", positionTop: 340, positionLeft: 420 },
      ]
    },
    {
      name: "Security Context Management",
      steps: [
        { from: "AUSF", to: "NRF", endpoint: "PATCH /nnrf-nfm/v1/nf-instances", positionTop: 250, positionLeft: 330 },
        { from: "AUSF", to: "UDM", endpoint: "PUT /nudm-ueau/v1/security-context", positionTop: 350, positionLeft: 430 },
      ]
    },
  ],
};

export default vnfProcedures;
