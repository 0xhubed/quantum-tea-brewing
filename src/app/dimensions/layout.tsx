export default function DimensionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-quantum-50 to-tea-50 dark:from-gray-900 dark:to-gray-800">
      {children}
    </div>
  )
}