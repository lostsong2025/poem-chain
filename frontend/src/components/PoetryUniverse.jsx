import React, { useEffect, useRef } from 'react';
import './PoetryUniverse.css';

const PoetryUniverse = ({ poems }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 设置canvas尺寸
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 创建星星
        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5
        }));

        // 创建诗句粒子
        const particles = poems.map(poem => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            text: poem.title,
            size: Math.random() * 12 + 8,
            speed: Math.random() * 0.5 + 0.1,
            angle: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.5 + 0.3
        }));

        // 动画循环
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 6, 36, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制星星
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.size/2})`;
                ctx.fill();

                star.y += star.speed;
                if (star.y > canvas.height) star.y = 0;
            });

            // 绘制诗句
            particles.forEach(particle => {
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.font = `${particle.size}px "Source Code Pro", monospace`;
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fillText(particle.text, particle.x, particle.y);
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [poems]);

    return <canvas ref={canvasRef} className="poetry-universe" />;
};

export default PoetryUniverse;