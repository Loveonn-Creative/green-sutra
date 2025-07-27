import { useEffect, useRef } from 'react';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

const Confetti = ({ trigger, onComplete }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
  }>>([]);

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--success))',
    'hsl(var(--warning))',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FECA57'
  ];

  const createParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particles.current = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        velocityX: (Math.random() - 0.5) * 8,
        velocityY: Math.random() * -15 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current.filter(particle => {
      // Update position
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.velocityY += 0.3; // gravity
      particle.rotation += particle.rotationSpeed;

      // Draw particle
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();

      // Remove particles that are off screen
      return particle.y < canvas.height + 50 && particle.x > -50 && particle.x < canvas.width + 50;
    });

    if (particles.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (trigger) {
      createParticles();
      animate();
    }
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ display: trigger ? 'block' : 'none' }}
    />
  );
};

export default Confetti;