// components/page-background.tsx
export function PageBackground({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative min-h-[80vh] ${className}`}>
      {/* Dot pattern background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute h-full w-full opacity-25"
          style={{
            background: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 80%)'
          }}
        ></div>
      </div>
      {children}
    </div>
  );
}