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
        let pSys = new ParticleSystem();
        addSomeParticles(pSys);

        const params = {
            frameCount: 0,
            speed: 0.5,
            particles: pSys.particles,
        }

        function render(ts) {
            console.log(ts);
            params.frameCount++;
            pSys.update();
            draw(context, params);
            window.requestAnimationFrame(render);
        }
        render()
    }, []);

    return <canvas ref={canvasRef} {...props} />
}

function addSomeParticles(particleSystem) {
    particleSystem.addParticle({
        x: [400, 100],
        v: [2, 0],
        mass: 200,
        radius: 10,
        color: "#0000ff"
    });
    particleSystem.addParticle({
        x: [400, 150],
        v: [5, 0],
        color: "#e0cfa8"
    });
    particleSystem.addParticle({
        x: [400, 250],
        mass: 1000,
        radius: 20,
        color: '#ffff00'
    });
}

export default Canvas