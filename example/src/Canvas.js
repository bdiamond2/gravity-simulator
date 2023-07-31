import React, { useRef, useEffect, useState } from 'react';
import { Particle } from './Particle.js';

function Canvas(props) {
    const canvasRef = useRef(null);

    function draw(ctx, params) {
        console.log(params);

        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        ctx.clearRect(0, 0, w, h)

        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < params.particles.length; i++) {
            ctx.save();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(params.particles[i].x, params.particles[i].y, 20 * Math.sin(params.frameCount * 0.05) ** 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let particles = makeSomeParticles(
            10, 800, 400, 0, 0
        );

        const params = {
            frameCount: 0,
            particles: particles,
        }

        //Our draw came here
        function render() {
            params.frameCount++;
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