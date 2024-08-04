"use client";
interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <div>{children}</div>
  );
};
