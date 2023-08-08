import React, { useRef, useEffect } from 'react';
import { ParticleSystem } from './Particle.js';

function Canvas(props) {
    const canvasRef = useRef(null);

    function draw(ctx, params) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.clearRect(0, 0, w, h)

        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < params.particles.length; i++) {
            const p = params.particles[i];
            ctx.save();
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
        let pSys = new ParticleSystem();
        addSomeParticles(pSys);

        const params = {
            frameCount: 0,
            speed: 0.5,
            particles: pSys.particles,
        }

        function clickHandler(event) {
            const x = event.x - rect.left;
            const y = event.y - rect.top;
            pSys.addParticle({
                x: [x, y],
                v: [2, 0],
                mass: 0.01,
                radius: 5,
                color: "#ffffff"
            });
        }

        function render(ts) {
            params.frameCount++;
            pSys.update();
            draw(context, params);
            window.requestAnimationFrame(render);
        }
        render();
        return () => {
            canvas.removeEventListener('click', clickHandler);
        }
    }, []);

    return <canvas ref={canvasRef} {...props} />
}

function addSomeParticles(particleSystem) {
    particleSystem.addParticle({
        x: [400, 150],
        v: [2.5, 0],
        mass: 1,
        radius: 10,
        color: "#0000ff"
    });
    particleSystem.addParticle({
        x: [400, 250],
        v: [4, 0],
        mass: 1,
        color: "#e0cfa8"
    });
    particleSystem.addParticle({
        x: [400, 300],
        v: [0, 0],
        mass: 1000,
        radius: 30,
        color: '#ffff00'
    });
}

export default Canvas;