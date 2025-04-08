import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { ReactNode } from "react";

interface ICards {
  children?: ReactNode;
  title?: string;
  actions?: ReactNode;
}

const CustomCard: React.FC<ICards> = ({ children, title, actions }) => {
  return (
    <Card className="mt-5 border-t-yellow-uika border-t-3">
      <CardHeader>
        <CardTitle className="text-3xl text-[#FDA31A]">{title}</CardTitle>
        {actions}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
