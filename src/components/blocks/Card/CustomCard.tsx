import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { ReactNode } from "react";

interface ICards {
  children?: ReactNode;
  title?: string;
  actions?: ReactNode;
  cardStyle?: string;
}

const CustomCard: React.FC<ICards> = ({
  children,
  title,
  actions,
  cardStyle,
}) => {
  return (
    <Card
      className={`mt-5 border-t-3 ${
        cardStyle ? cardStyle : "border-t-yellow-uika"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-3xl text-[#FDA31A]">{title}</CardTitle>
        {actions}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
