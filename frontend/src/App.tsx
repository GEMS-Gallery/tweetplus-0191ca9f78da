import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';
import UserProfile from './components/UserProfile';

interface Tweet {
  id: bigint;
  content: string;
  createdAt: bigint;
  likes: bigint;
}

const App: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const fetchedTweets = await backend.getTweets();
      setTweets(fetchedTweets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tweets:', error);
      setLoading(false);
    }
  };

  const handleCreateTweet = async (content: string) => {
    try {
      const result = await backend.createTweet(content);
      if ('ok' in result) {
        setTweets([result.ok, ...tweets]);
      } else {
        console.error('Error creating tweet:', result.err);
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  const handleLikeTweet = async (id: bigint) => {
    try {
      const result = await backend.likeTweet(id);
      if ('ok' in result) {
        setTweets(tweets.map(tweet =>
          tweet.id === id ? { ...tweet, likes: tweet.likes + BigInt(1) } : tweet
        ));
      } else {
        console.error('Error liking tweet:', result.err);
      }
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };

  const handleDeleteTweet = async (id: bigint) => {
    try {
      const result = await backend.deleteTweet(id);
      if ('ok' in result) {
        setTweets(tweets.filter(tweet => tweet.id !== id));
      } else {
        console.error('Error deleting tweet:', result.err);
      }
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Enhanced Twitter Clone
        </Typography>
        <UserProfile tweetCount={tweets.length} />
        <TweetForm onCreateTweet={handleCreateTweet} />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TweetList
            tweets={tweets}
            onLikeTweet={handleLikeTweet}
            onDeleteTweet={handleDeleteTweet}
          />
        )}
      </Box>
    </Container>
  );
};

export default App;
