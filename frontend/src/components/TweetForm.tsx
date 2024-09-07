import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface TweetFormProps {
  onCreateTweet: (content: string) => void;
}

const TweetForm: React.FC<TweetFormProps> = ({ onCreateTweet }) => {
  const { control, handleSubmit, reset } = useForm();
  const [charCount, setCharCount] = useState(280);

  const onSubmit = (data: { content: string }) => {
    onCreateTweet(data.content);
    reset();
    setCharCount(280);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
      <Controller
        name="content"
        control={control}
        defaultValue=""
        rules={{ required: true, maxLength: 280 }}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={4}
            fullWidth
            placeholder="What's happening?"
            variant="outlined"
            onChange={(e) => {
              field.onChange(e);
              setCharCount(280 - e.target.value.length);
            }}
          />
        )}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="body2" color={charCount < 0 ? 'error' : 'textSecondary'}>
          {charCount} characters remaining
        </Typography>
        <Button type="submit" variant="contained" color="primary" disabled={charCount < 0}>
          Tweet
        </Button>
      </Box>
    </Box>
  );
};

export default TweetForm;
