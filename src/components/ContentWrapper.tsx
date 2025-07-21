export const ContentWrapper = ({ children }) => {
  return (
    <div className="relative h-full w-full flex-col px-8 pt-[180px] pb-16">
      {children}
    </div>
  );
};
