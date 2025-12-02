export interface User {
  id: number;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface Lawyer {
  id: number;
  lawyer_id: {
    val: string;
  };
  lawyer_name: {
    val: string;
  };
  bio: {
    val: string;
  };
  avatar_url: {
    val: string;
  };
  specializations: Array<{
    val: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface LawyerReview {
  id: number;
  lawyer_id: {
    val: string;
  };
  author_id: {
    val: string;
  };
  case_type: string;
  review: {
    val: string;
  };
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}

export interface UpdateLawyerRequest {
  lawyer_name?: {
    val: string;
  };
  bio?: {
    val: string;
  };
  avatar_url?: {
    val: string;
  };
  specializations?: Array<{
    val: string;
  }>;
}
