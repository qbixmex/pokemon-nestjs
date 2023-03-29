export interface HttpAdapter {
  get<T>(url: string, limit: number, offset: number): Promise<T>;
}
