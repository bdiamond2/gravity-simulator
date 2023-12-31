import React, { useRef, useEffect, useMemo } from 'react';
import { ParticleSystem } from './Particle.js';

function Canvas({ sliderVals, width, height }) {
    const canvasRef = useRef(null);
    console.log(sliderVals);
    const mass = sliderVals.mass;
    const velocity = sliderVals.velocity;
    const scale = sliderVals.scale;
    const pSys = useMemo(() => {
        const particleSystem = new ParticleSystem();
        addSomeParticles(particleSystem);
        return particleSystem;
    }, []);

    function draw(ctx, params) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.clearRect(0, 0, w, h)

        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < params.particles.length; i++) {
            const p = params.particles[i];
            ctx.save();
            ctx.translate(w / 2, h / 2);
            ctx.scale(scale, -scale);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x[0], p.x[1], p.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.addEventListener('click', clickHandler);
        const rect = canvas.getBoundingClientRect();
        let frameId;
        let lastTs = 0;

        const params = {
            frameCount: 0,
            speed: 0.5,
            particles: pSys.particles,
        }

        function clickHandler(event) {
            let x = event.x - rect.left;
            let y = event.y - rect.top;
            x -= canvas.getContext('2d').canvas.width / 2;
            y = (y * -1) + canvas.getContext('2d').canvas.height / 2;
            x /= scale;
            y /= scale;
            pSys.addParticle({
                x: [x, y],
                v: [parseFloat(velocity), 0],
                mass: mass,
                radius: 5 + mass / 20,
            });
        }

        function render(ts) {
            params.frameCount++;
            if (ts - lastTs >= 10) {
                pSys.update();
                draw(context, params);
                lastTs = ts;
            }
            frameId = window.requestAnimationFrame(render);
        }

        render();
        return () => {
            canvas.removeEventListener('click', clickHandler);
            window.cancelAnimationFrame(frameId);
        }
    }, [mass, velocity, scale, pSys]);

    return <canvas ref={canvasRef} width={width} height={height} />
}

function addSomeParticles(particleSystem) {
    particleSystem.addParticle({
        x: [0, 150],
        v: [2.5, 0],
        mass: 0.001,
        radius: 10,
        color: "#0000ff"
    });
    particleSystem.addParticle({
        x: [0, 50],
        v: [4, 0],
        mass: 0.001,
        color: "#e0cfa8"
    });
    particleSystem.addParticle({
        x: [0, 0],
        v: [0, 0],
        mass: 1000,
        radius: 30,
        color: '#ffff00'
    });
}

export default Canvas;