import React from "react";

interface IPropsTitle {
  title: string;
  subTitle?: string;
}

const Title = (props: IPropsTitle) => {
  const { title, subTitle } = props;
  return (
    <h1 className="text-2xl font-normal">
      {title}{" "}
      <span className="text-[16px] font-normal text-muted-foreground">
        {subTitle}
      </span>
    </h1>
  );
};

export default Title;
