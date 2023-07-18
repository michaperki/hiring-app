import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card bg-white p-4 rounded-lg shadow-md border border-gray-300">
      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-2">{job.company}</p>
      <p className="text-gray-800">{job.description}</p>
    </div>
  );
};

export default JobCard;
