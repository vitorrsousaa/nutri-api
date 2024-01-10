export type IGenerateToken = {
  id: string;
};

export type PayloadProps = {
  id: string;
};

export interface IToken {
  generate: ({ id }: IGenerateToken, duration?: number) => string;
  verify: (token: string) => string | PayloadProps;
}
