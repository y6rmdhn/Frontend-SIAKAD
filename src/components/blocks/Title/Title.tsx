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
    <h1 className={`${titleStyle ? titleStyle : "md:text-2xl text-lg"} font-normal`}>
      {title}{" "}
      <span className={`${classname ? classname : "w-3! h-3! md:w-4! h-4!"} font-normal text-muted-foreground`}>
        {subTitle}
      </span>
    </h1>
  );
};

export default Title;
