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
    <h1 className={`${titleStyle ? titleStyle : "md:text-lg sm:text-2xl text-lg"} font-normal`}>
      {title}{" "}
      <span className="text-[16px] font-normal text-muted-foreground">
        {subTitle}
      </span>
    </h1>
  );
};

export default Title;
