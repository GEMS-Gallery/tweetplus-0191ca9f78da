import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

interface UserProfileProps {
  tweetCount: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ tweetCount }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Avatar sx={{ width: 56, height: 56, mr: 2 }}>JD</Avatar>
      <Box>
        <Typography variant="h6">John Doe</Typography>
        <Typography variant="body2" color="text.secondary">
          @johndoe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tweetCount} Tweets
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
