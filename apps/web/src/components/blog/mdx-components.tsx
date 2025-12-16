import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type MDXComponents = Record<string, React.ComponentType<Record<string, unknown>>>

export const mdxComponents: MDXComponents = {
  h1: ({ children }: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="text-3xl md:text-4xl font-bold mb-6 mt-12 first:mt-0"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="text-2xl md:text-3xl font-semibold mb-4 mt-10 text-[--color-text-primary] border-b border-[--color-border] pb-2"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="text-xl md:text-2xl font-semibold mb-3 mt-8 text-[--color-text-primary]"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h3>
  ),
  h4: ({ children }: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="text-lg font-semibold mb-2 mt-6 text-[--color-text-primary]"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h4>
  ),
  p: ({ children }: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-[--color-text-secondary] leading-relaxed mb-4">{children}</p>
  ),
  a: ({ href, children }: ComponentPropsWithoutRef<'a'>) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[--color-accent] hover:text-[--color-accent-dim] underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={href || '#'}
        className="text-[--color-accent] hover:text-[--color-accent-dim] underline underline-offset-4 transition-colors"
      >
        {children}
      </Link>
    )
  },
  ul: ({ children }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-[--color-text-secondary] pl-2">
      {children}
    </ul>
  ),
  ol: ({ children }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-[--color-text-secondary] pl-2">
      {children}
    </ol>
  ),
  li: ({ children }: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-4 border-[--color-accent] pl-4 py-2 my-6 bg-[--color-surface] rounded-r-lg">
      <div className="text-[--color-text-secondary] italic">{children}</div>
    </blockquote>
  ),
  code: ({ children, className }: ComponentPropsWithoutRef<'code'>) => {
    // Check if this is inline code (no className means inline)
    const isInline = !className
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-[--color-surface-elevated] text-[--color-accent] text-sm font-mono">
          {children}
        </code>
      )
    }
    return (
      <code className={className} style={{ fontFamily: 'var(--font-mono)' }}>
        {children}
      </code>
    )
  },
  pre: ({ children }: ComponentPropsWithoutRef<'pre'>) => (
    <div className="relative my-6 group">
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[--color-surface-elevated] border border-[--color-border] border-b-0 rounded-t-lg">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[--color-error]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[--color-warning]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[--color-success]/60" />
        </div>
        <span className="text-xs text-[--color-text-muted] ml-2">code</span>
      </div>
      <pre className="p-4 bg-[--color-surface] border border-[--color-border] rounded-b-lg overflow-x-auto text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  ),
  hr: () => <hr className="my-8 border-[--color-border]" />,
  table: ({ children }: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-[--color-border] rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-[--color-surface-elevated]">{children}</thead>
  ),
  tbody: ({ children }: ComponentPropsWithoutRef<'tbody'>) => <tbody>{children}</tbody>,
  tr: ({ children }: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="border-b border-[--color-border]">{children}</tr>
  ),
  th: ({ children }: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-[--color-text-primary]">
      {children}
    </th>
  ),
  td: ({ children }: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-3 text-sm text-[--color-text-secondary]">{children}</td>
  ),
  img: ({ src, alt }: ComponentPropsWithoutRef<'img'>) => (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || ''} className="w-full rounded-lg border border-[--color-border]" />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-[--color-text-muted]">{alt}</figcaption>
      )}
    </figure>
  ),
  strong: ({ children }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-[--color-text-primary]">{children}</strong>
  ),
  em: ({ children }: ComponentPropsWithoutRef<'em'>) => <em className="italic">{children}</em>,
}
