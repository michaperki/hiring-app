import React from 'react';
import Slider from 'react-slick';
import JobCard from './JobCard'; // Import your JobCard component
import 'slick-carousel/slick/slick.css';

// Sample job data for demonstration purposes
const jobData = [
  {
    id: 1,
    title: 'Data Engineer',
    company: 'Company A',
    description: 'Job description for Job 1',
  },
  {
    id: 2,
    title: 'Banking Analyst',
    company: 'Company B',
    description: 'Job description for Job 2',
  },
  // Add more job data as needed
];

const JobSwipeContainer = () => {
  // Optional: Customize the settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="job-swipe-container">
      <h1 className="text-3xl font-semibold mb-4">Swipe Through Jobs</h1>
      <Slider {...settings}>
        {jobData.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Slider>
    </div>
  );
};

export default JobSwipeContainer;
