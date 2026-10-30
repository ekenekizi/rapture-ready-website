export function ContentEmpty({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-border bg-paper/50 p-7 md:p-10">
      <p className="font-serif text-3xl leading-tight">{title}</p>
      <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
        {description}
      </p>
    </div>
  );
}
