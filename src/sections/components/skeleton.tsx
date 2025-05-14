const InvestmentSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-[31px]">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex p-[32px_24px] flex-col rounded-[25px] bg-gray-500/20 "
          >
            <div className="w-full h-[150px] bg-gray-500/20  rounded-[15px] mb-4" />
          </div>
        ))}
    </div>
  );
};

export default InvestmentSkeleton;
