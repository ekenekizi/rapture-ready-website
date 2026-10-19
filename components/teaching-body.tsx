import { PortableText } from "@portabletext/react";
import type { TeachingBodyBlock } from "@/sanity/types";
import type { TeachingImage } from "@/sanity/image-types";
import { TeachingPhoto } from "@/components/teaching-photo";

export function TeachingBody({ value }: { value: TeachingBodyBlock[] }) {
  return (
    <div className="font-serif text-xl leading-9">
      <PortableText
        value={value}
        components={{
          types: {
            teachingImage: ({ value }: { value: TeachingImage }) => (
              <div className="my-10 md:-mx-11">
                <TeachingPhoto image={value} variant="content" showCaption />
              </div>
            ),
          },
          block: {
            normal: ({ children }) => <p className="mb-6">{children}</p>,

            h2: ({ children }) => (
              <h2 className="mt-12 mb-5 text-4xl leading-tight">{children}</h2>
            ),

            h3: ({ children }) => (
              <h3 className="mt-9 mb-4 text-3xl leading-tight">{children}</h3>
            ),

            blockquote: ({ children }) => (
              <blockquote className="my-10 border-l-2 border-gold pl-6 text-2xl leading-relaxed">
                {children}
              </blockquote>
            ),
            scriptureReference: ({ children }) => (
              <p className="-mt-6 mb-10 pl-6 font-sans text-[10px] tracking-[0.16em] text-muted uppercase">
                {children}
              </p>
            ),
          },

          list: {
            bullet: ({ children }) => (
              <ul className="mb-6 list-disc space-y-3 pl-6">{children}</ul>
            ),

            number: ({ children }) => (
              <ol className="mb-6 list-decimal space-y-3 pl-6">{children}</ol>
            ),
          },
        }}
      />
    </div>
  );
}
