import Button from "../components/ui/button";

const BoardPage = () => {
  return (
    <div>
      <Button buttonType="primary" size="large">
        Primary Button(L)
      </Button>
      <Button buttonType="primary">Primary Button(S)</Button>
      <Button buttonType="secondary">Secondary Button</Button>
      <Button buttonType="destructive">Destructive Button</Button>
    </div>
  );
};

export default BoardPage;
