export interface AuthInterface {
  login(
    email: string,
    password: string
  ): Promise<{ token: string; error: any }>;
  logout(): void;
  forgotPassword(email: string): Promise<{ error: any; token: string }>;
  resetPassword({
    email,
    reset_token,
    password,
    confirmPassword,
  }: {
    email: string;
    reset_token: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ error: any; token: string }>;

  updatePassword({
    password,
    new_password,
    confirm_password,
  }: {
    password: string;
    new_password: string;
    confirm_password: string;
  }): Promise<{ error: any; token: string }>;

  registerUser({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    role,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    role: "USER" | "BEE";
  }): Promise<{ error: any; token: string }>;

  registerBee({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    location_id,
    role,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    location_id: string;
    role: "USER" | "BEE";
  }): Promise<{ error: any; token: string }>;
}
