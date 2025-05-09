export type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  isMockUser?: boolean;
};

export const DEFAULT_PROFILE_IMAGE = "/default-profile.jpg";

export const mockUsers = {
  mockuser1: {
    id: "mockuser1",
    name: "Mock User One",
    email: "mock1@example.com",
    picture: DEFAULT_PROFILE_IMAGE,
    isMockUser: true,
  },
  mockuser2: {
    id: "mockuser2",
    name: "Mock User Two",
    email: "mock2@example.com",
    picture: DEFAULT_PROFILE_IMAGE,
    isMockUser: true,
  },
  mockuser3: {
    id: "mockuser3",
    name: "Mock User Three",
    email: "mock3@example.com",
    picture: DEFAULT_PROFILE_IMAGE,
    isMockUser: true,
  },
};
