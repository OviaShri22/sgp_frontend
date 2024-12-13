import React from 'react';
import FeatureSection from '../components/FeatureSection';
import StudentNavbar from '../components/StudentNavbar'; // Import the StudentNavbar component
import { Typography, Box } from '@mui/material';

const StudHomePage = () => {
  return (
    <div>
      <Box sx={{ mt: 4 }}>
        <StudentNavbar /> {/* Add the StudentNavbar component */}
        <div className="mt-32">
          <FeatureSection />
        </div>
      </Box>

      {/* Student Code of Conduct */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          backgroundColor: 'rgba(47, 85, 151, 0.9)', // Semi-transparent blue background
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for a floating effect
          maxWidth: '800px',
          mx: 'auto', // Center align the box
          textAlign: 'justify',
          lineHeight: 1.6,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Student Code of Conduct for the Grievance Portal
        </Typography>
        <Typography
          component="ul"
          variant="body1"
          gutterBottom
          sx={{ listStyleType: 'disc', pl: 4, fontSize: '1.1rem' }}
        >
          <li>The portal is strictly for <strong>department-related issues</strong>.</li>
          <li>
            Students can submit:
            <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
              <li><strong>Complaints</strong>: Addressing problems or challenges.</li>
              <li><strong>Feedback</strong>: Suggestions for improvement.</li>
              <li><strong>Information Inquiries</strong>: Requests for clarification.</li>
            </ul>
          </li>
          <li>
            Complaints must be <strong>reasonable, specific, and genuine</strong>. Frivolous or
            baseless submissions will not be entertained.
          </li>
          <li>
            <strong>False complaints</strong> are strictly prohibited. Severe penalties, including
            suspension of portal access, will be imposed for proven false claims.
          </li>
          <li>
            For <strong>sensitive complaints</strong>, students can opt for <strong>anonymous
            mode</strong> to hide their personal details.
            <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
              <li>Valid proof or evidence is required for complaints in anonymous mode.</li>
              <li>
                Misuse of anonymous mode will result in warnings, and exceeding the warning limit
                will permanently disable this feature for the user.
              </li>
            </ul>
          </li>
          <li>
            Misuse of the portal, such as submitting non-department-related complaints or using
            inappropriate language, will lead to disciplinary action.
          </li>
          <li>
            All users are expected to use the portal responsibly and contribute positively to
            resolving issues.
          </li>
        </Typography>
      </Box>
    </div>
  );
};

export default StudHomePage;
