export interface HttpInterface {
  get({ url, options }: HttpConfig): Promise<Partial<HttpResponse>>;
  post({ url, options, data }: HttpConfig): Promise<Partial<HttpResponse>>;
  put({ url, options, data }: HttpConfig): Promise<Partial<HttpResponse>>;
  delete({ url, options }: HttpConfig): Promise<Partial<HttpResponse>>;
}

export interface HttpConfig {
  url: string;
  options?: HttpOptions;
  data?: any;
}

export interface HttpOptions {
  headers?: any;
}

export interface HttpResponse {
  data: any;
  status: number;
  error: any;
}
