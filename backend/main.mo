import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type Tweet = {
    id: Nat;
    content: Text;
    createdAt: Time.Time;
    likes: Nat;
  };

  stable var nextTweetId: Nat = 0;
  let tweets = HashMap.HashMap<Nat, Tweet>(0, Nat.equal, Hash.hash);

  public func createTweet(content: Text) : async Result.Result<Tweet, Text> {
    if (Text.size(content) > 280) {
      return #err("Tweet content exceeds 280 characters");
    };

    let id = nextTweetId;
    nextTweetId += 1;

    let tweet: Tweet = {
      id;
      content;
      createdAt = Time.now();
      likes = 0;
    };

    tweets.put(id, tweet);
    #ok(tweet)
  };

  public query func getTweets() : async [Tweet] {
    Iter.toArray(tweets.vals())
  };

  public func likeTweet(id: Nat) : async Result.Result<(), Text> {
    switch (tweets.get(id)) {
      case (null) {
        #err("Tweet not found")
      };
      case (?tweet) {
        let updatedTweet = {
          id = tweet.id;
          content = tweet.content;
          createdAt = tweet.createdAt;
          likes = tweet.likes + 1;
        };
        tweets.put(id, updatedTweet);
        #ok()
      };
    }
  };

  public func deleteTweet(id: Nat) : async Result.Result<(), Text> {
    switch (tweets.remove(id)) {
      case (null) {
        #err("Tweet not found")
      };
      case (?_) {
        #ok()
      };
    }
  };
}
