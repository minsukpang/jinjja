import Link from "next/link";

export default function Header({
  title,
  back,
}: {
  title: string;
  back?: string;
}) {
  return (
    <header className="header">
      {back ? (
        <Link href={back} aria-label="뒤로가기">
          ←
        </Link>
      ) : (
        <span>{title}</span>
      )}
      {back && <span>{title}</span>}
      <span style={{ width: 24 }} />
    </header>
  );
}
