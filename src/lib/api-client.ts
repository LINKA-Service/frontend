import {
  Lawyer,
  LawyerReview,
  UpdateLawyerRequest,
  UpdateUserRequest,
  User,
} from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // 쿠키 포함
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || "API request failed");
    }

    return response.json();
  }

  // User APIs
  async getMe(): Promise<User> {
    return this.request<User>("/api/users/me");
  }

  async updateMe(data: UpdateUserRequest): Promise<User> {
    return this.request<User>("/api/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.request<User>(`/api/users/${username}`);
  }

  async changeUsername(username: string): Promise<User> {
    return this.request<User>("/api/users/change-username", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
  }

  // Lawyer APIs
  async getLawyerMe(): Promise<Lawyer> {
    return this.request<Lawyer>("/api/lawyers/me");
  }

  async updateLawyerMe(data: UpdateLawyerRequest): Promise<Lawyer> {
    return this.request<Lawyer>("/api/lawyers/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getLawyerById(lawyerId: string): Promise<Lawyer> {
    return this.request<Lawyer>(`/api/lawyers/${lawyerId}`);
  }

  async changeLawyerId(lawyerId: string): Promise<Lawyer> {
    return this.request<Lawyer>("/api/lawyers/change-lawyer-id", {
      method: "POST",
      body: JSON.stringify({ lawyer_id: { val: lawyerId } }),
    });
  }

  async getLawyerReviews(lawyerId: number): Promise<LawyerReview[]> {
    return this.request<LawyerReview[]>(`/api/lawyers/${lawyerId}/reviews`);
  }

  async createLawyerReview(
    lawyerId: number,
    review: string,
    case_type: string
  ): Promise<LawyerReview> {
    return this.request<LawyerReview>(`/api/lawyers/${lawyerId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ review: { val: review }, case_type }),
    });
  }

  // Auth APIs
  async login(username: string, password: string): Promise<void> {
    return this.request<void>("/api/lawyer-auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>("/api/lawyer-auth/logout", {
      method: "POST",
    });
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    return this.request<void>("/api/lawyer-auth/change-password", {
      method: "POST",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  }
}

export const apiClient = new ApiClient();
