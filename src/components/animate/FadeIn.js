export default function FadeIn({
  children,
  durationTime = '1s',
  durationDelay = 0,
}) {
  return (
    <div
      style={{
        animationDuration: durationTime,
        animationDelay: durationDelay,
      }}
      className="w-full animate-fadeUpAnimation"
    >
      {children}
    </div>
  )
}
