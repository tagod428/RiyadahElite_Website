import { Gamepad2 } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-8 w-auto" }: LogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="bg-primary/30 rounded-full w-full h-full absolute blur-md"></div>
        </div>
      </div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Gamepad2 className="text-primary w-full h-full" />
      </div>
    </div>
  );
};

export default Logo;