const BoardCard = () => {
  return (
    <div className="px-4 py-6 bg-secondary-color rounded-lg shadow-card cursor-pointer group">
      <h4 className="heading-md heading-color mb-2 group-hover:text-main-purple">
        Building UI for onboarding flow
      </h4>
      <p className="body-md">0 of 3 substasks</p>
    </div>
  );
};

export default BoardCard;
