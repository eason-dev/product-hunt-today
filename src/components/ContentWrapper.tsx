export const ContentWrapper = ({ children }) => {
  return (
    <div className="relative h-full w-full flex-col px-12 pt-[120px] pb-12">
      {children}
    </div>
  );
};
