export default function FadeRight({
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
      className="w-full in-right"
    >
      {children}
    </div>
  )
}
