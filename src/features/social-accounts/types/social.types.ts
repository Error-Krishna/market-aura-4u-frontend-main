export interface InstagramConnection {
  isConnected: boolean;
  instagramId?: string;
}

export interface SocialAccounts {
  instagram: InstagramConnection;
}
