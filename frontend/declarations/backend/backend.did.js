export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Tweet = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'createdAt' : Time,
    'likes' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'ok' : Tweet, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'createTweet' : IDL.Func([IDL.Text], [Result_1], []),
    'deleteTweet' : IDL.Func([IDL.Nat], [Result], []),
    'getTweets' : IDL.Func([], [IDL.Vec(Tweet)], ['query']),
    'likeTweet' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
