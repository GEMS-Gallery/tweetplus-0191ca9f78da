import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : Tweet } |
  { 'err' : string };
export type Time = bigint;
export interface Tweet {
  'id' : bigint,
  'content' : string,
  'createdAt' : Time,
  'likes' : bigint,
}
export interface _SERVICE {
  'createTweet' : ActorMethod<[string], Result_1>,
  'deleteTweet' : ActorMethod<[bigint], Result>,
  'getTweets' : ActorMethod<[], Array<Tweet>>,
  'likeTweet' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
