interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="container grid h-screen flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[480px] lg:p-8">
        <div className="-ml-10 mb-3 flex items-center justify-center">
          
          <img 
            src="/Cocobod Logo-01.png" 
            alt="Cocobod Logo" 
            className="max-w-full h-auto" 
            style={{ maxWidth: '200px', height: 'auto' }} 
          />
        </div>
        {children}
      </div>
    </div>
  );
}
