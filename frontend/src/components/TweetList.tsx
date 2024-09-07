import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

interface Tweet {
  id: bigint;
  content: string;
  createdAt: bigint;
  likes: bigint;
}

interface TweetListProps {
  tweets: Tweet[];
  onLikeTweet: (id: bigint) => void;
  onDeleteTweet: (id: bigint) => void;
}

const TweetList: React.FC<TweetListProps> = ({ tweets, onLikeTweet, onDeleteTweet }) => {
  return (
    <List>
      {tweets.map((tweet) => (
        <ListItem
          key={tweet.id.toString()}
          alignItems="flex-start"
          secondaryAction={
            <Box>
              <IconButton edge="end" aria-label="like" onClick={() => onLikeTweet(tweet.id)}>
                <FavoriteIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTweet(tweet.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        >
          <ListItemText
            primary={tweet.content}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {new Date(Number(tweet.createdAt) / 1000000).toLocaleString()}
                </Typography>
                {` - ${tweet.likes.toString()} likes`}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TweetList;
