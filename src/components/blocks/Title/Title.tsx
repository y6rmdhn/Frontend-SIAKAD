import React from "react";

interface IPropsTitle {
  title: string;
  subTitle?: string;
  classname?: string;
  titleStyle?: string;
}

const Title = (props: IPropsTitle) => {
  const { title, subTitle, classname, titleStyle } = props;
  return (
    <h1
      className={`${
        titleStyle
          ? titleStyle
          : "text-lg md:text-2xl flex flex-row gap-2 items-center font-normal"
      }`}
    >
      {title}
      <span className="text-xs md:text-sm font-normal text-muted-foreground">
        {subTitle}
      </span>
    </h1>
  );
};

export default Title;
