import GraphQL from "../graphql/graphql";
import { AuthInterface } from "./interface";

class Auth implements AuthInterface {
  constructor(private graphql: GraphQL) {}

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; error: any }> {
    const { data, error } = await this.graphql.mutation(`#graphql
      mutation{
            login(email:"${email}",password:"${password}"){
                token
                error
            }
        }`);

    return {
      token: data?.login?.token || "",
      error: error,
    };
  }

  async logout(): Promise<{ token: string; error: any }> {
    const { data, error } = await this.graphql.mutation(`#graphql
      mutation{
            logout{
                token
                error
            }
        }`);

    return {
      token: data?.logout?.token || "",
      error: error,
    };
  }

  async forgotPassword(email: string): Promise<{ token: string; error: any }> {
    const { data, error } = await this.graphql.mutation(`#graphql
      mutation{
        sendResetMail(email:"${email}"){
                token
                error
            }
        }`);

    return {
      token: data?.sendResetMail?.token || "",
      error: error,
    };
  }

  async resetPassword({
    email,
    reset_token,
    password,
    confirmPassword,
  }: {
    email: string;
    reset_token: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ token: string; error: any }> {
    const { data, error } = await this.graphql.mutation(`#graphql
      mutation{
            resetPassword(
                email:"${email}",
                reset_token:"${reset_token}",
                password:"${password}",
                confirmPassword:"${confirmPassword}"
            ){
                token
                error
            }
        }`);

    return {
      token: data?.login?.token || "",
      error: error,
    };
  }

  async updatePassword({
    password,
    new_password,
    confirm_password,
  }: {
    password: string;
    new_password: string;
    confirm_password: string;
  }): Promise<{ token: string; error: any }> {
    const { data, error } = await this.graphql.mutation(`#graphql
      mutation{
             updatePassword(
                password:"${password}",
                new_password:"${new_password}",
                confirm_password:"${confirm_password}"
            ){
                token
                error
            }
        }`);

    return {
      token: data?.login?.token || "",
      error: error,
    };
  }

  async registerUser({
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
  }): Promise<{ error: any; token: string }> {
    const { data, error } = await this.graphql.mutation(`#graphql
    mutation{
        register(
          first_name:"${first_name}",
          last_name:"${last_name}",
          email:"${email}",
          password:"${password}",
          confirm_password:"${confirm_password}",
          role:USER
          ){
            token
            error
        }
    }`);

    return {
      token: data?.login?.token || "",
      error: error,
    };
  }

  async registerBee({
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
    location_id: string;
    email: string;
    password: string;
    confirm_password: string;
    role: "USER" | "BEE";
  }): Promise<{ error: any; token: string }> {
    const { data, error } = await this.graphql.mutation(`#graphql
    mutation{
        registerBee(
          first_name:"${first_name}",
          last_name:"${last_name}",
          email:"${email}",
          password:"${password}",
          confirm_password:"${confirm_password}",
          location_id:"${location_id}",
          role:BEE
          ){
            token
            error
        }
    }`);

    return {
      token: data?.login?.token || "",
      error: error,
    };
  }
}

export default Auth;