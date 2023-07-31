import React, { useRef, useEffect, useState } from 'react';
import { Particle, ParticleSystem } from './Particle.js';

function Canvas(props) {
    const canvasRef = useRef(null);

    function draw(ctx, params) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.clearRect(0, 0, w, h)

        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < params.particles.length; i++) {
            const p = params.particles[i];
            ctx.save();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(p.x[0], p.x[1], p.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        let pSys = new ParticleSystem([
            new Particle([w / 2, h / 2]),
            new Particle([100, 100], [1, 1]),
            new Particle([0, 0], [2, 0], [0, 0.1]),
        ]);

        const params = {
            frameCount: 0,
            particles: pSys.particles,
        }

        function render() {
            params.frameCount++;
            pSys.update();
            draw(context, params);
            window.requestAnimationFrame(render);
        }
        render()
    }, []);

    return <canvas ref={canvasRef} {...props} />
}

function makeSomeParticles(num, xBound, yBound, dxBound, dyBound) {
    let particles = [];
    for (let i = 0; i < num; i++) {
        particles.push(new Particle(
            Math.random() * xBound,
            Math.random() * yBound,
            Math.random() * dxBound,
            Math.random() * dyBound
        ));
    }
    return particles;
}

export default Canvas