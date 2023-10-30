export interface IBaseRepository<T> {
  create(item: T): T;
  delete(id: string): boolean;
}
