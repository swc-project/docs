import React from "react";

interface ChildProps {
  title: string;
  content: string;
}

interface BlockProps {
  children: React.ReactNode[];
  id?: string;
}

export default function Block(props: BlockProps) {
  return (
    <div className="container">
      <div id={props.id} className="row">
        {props.children.map((child: ChildProps) => (
          <>
            <div className="col">
              <h2>{child.title}</h2>
              <div>
                <p>{child.content}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
