export type Post = {
  /** Post's id */
  id: string;

  /** Sender's name */
  from_name: string;

  /** Sender's id */
  from_id: string;

  /** Post's text */
  message: string;

  /** Post's type */
  type: string;

  /** Post's publication date */
  created_time: string;
};

export type Sender = {
  /** Sender's name */
  name: string;

  /** Sender's id */
  id: string;

  /** Number of posts published by the sender */
  postsCount: number;
};
