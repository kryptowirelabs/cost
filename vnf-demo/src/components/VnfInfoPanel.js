import React from 'react';

const VnfInfoPanel = ({ resourceRequirements }) => {
  if (!resourceRequirements) {
    return <p>No resource requirements calculated yet. Please submit VNF details.</p>;
  }

  // Calculate total cost for all VNFs
  const totalCost = Object.keys(resourceRequirements).reduce((sum, vnf) => {
    return sum + parseFloat(resourceRequirements[vnf].totalCostPerHour);
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Resource Requirements and Costs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {Object.keys(resourceRequirements).map((vnf) => (
          <div key={vnf} style={{ flex: '0 1 calc(33.33% - 10px)', boxSizing: 'border-box', marginBottom: '20px' }}>
            <strong>{vnf}:</strong>
            <ul>
              <li>Estimated CPU: {resourceRequirements[vnf].estimatedCpu} vCPUs</li>
              <li>Estimated RAM: {resourceRequirements[vnf].estimatedRam} GiB</li>
              <li>Required VM Count: {resourceRequirements[vnf].vmCount}</li>
              <li>Total Cost per Hour: ${resourceRequirements[vnf].totalCostPerHour}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', fontSize: '1.5em' }}>
        <strong>TOTAL COST (USD/hr): ${totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default VnfInfoPanel;

