import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { ReactNode } from "react";

interface ICards {
  children?: ReactNode;
  title?: React.ReactNode;
  actions?: ReactNode;
  cardStyle?: string;
  cardFooter?: ReactNode;
}

const CustomCard: React.FC<ICards> = ({
  children,
  title,
  actions,
  cardFooter,
  cardStyle,
}) => {
  return (
    <Card
      className={`mt-5 border-t-1 ${
        cardStyle ? cardStyle : "border-t-yellow-uika border-t-3"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-3xl text-[#FDA31A]">{title}</CardTitle>
        {actions}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
    </Card>
  );
};

export default CustomCard;
