import React from 'react';

interface T extends React.HTMLAttributes<HTMLParagraphElement> {
  text?: string;
  limit?: number;
}
export const ReadMore = ({ limit = 100, text, ...props }: T) => {
  const [isReadMore, setReadMore] = React.useState(true);
  if (!text) return null;
  const toggle = () => {
    setReadMore(!isReadMore);
  };

  return (
    <p {...props}>
      {text.length > limit ? (
        <>
          {isReadMore ? text.slice(0, limit) : text}
          <span className="text-primary cursor-pointer" onClick={toggle}>
            {isReadMore ? '...baca selengkapnya' : ' tampilkan sedikit'}
          </span>
        </>
      ) : (
        text
      )}
    </p>
  );
};
