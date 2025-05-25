import React from "react";

interface IPropsTitle {
  title: string;
  subTitle?: string;
  className?: string;
  titleStyle?: string;
}

const Title = (props: IPropsTitle) => {
  const { title, subTitle, className, titleStyle } = props;
  return (
    <h1
      className={`
        ${
          titleStyle ??
          "text-lg md:text-2xl flex flex-row gap-2 items-center font-normal"
        }
        ${className ?? ""}
      `}
    >
      {title}
      <span className="text-xs md:text-sm font-normal text-muted-foreground">
        {subTitle}
      </span>
    </h1>
  );
};

export default Title;
