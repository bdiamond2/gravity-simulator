export class Particle {
    constructor(x, v, a, mass, radius) {
        this.x = x ? x : [0, 0];
        this.v = v ? v : [0, 0];
        this.a = a ? a : [0, 0];
        this.mass = mass ? mass : 10;
        this.radius = radius ? radius : 10;
    }
    update() {
        this.x[0] += this.v[0];
        this.x[1] += this.v[1];
        this.v[0] += this.a[0];
        this.v[1] += this.a[1];
    }
}

export class ParticleSystem {
    constructor(particles) {
        this.particles = particles;
    }
    update() {
        for (let p1 of this.particles) {
            p1.a = [0, 0]; // reset acceleration bc it's summed over mult particles
            for (let p2 of this.particles) {
                if (p1 !== p2) {
                    this.interact(p1, p2);
                }
            }
            p1.update();
        }
    }
    interact(p1, p2) {
        // Lovingly stolen from...
        // https://github.com/bdiamond2/excel-is-a-physics-engine/blob/main/NBodyGravity.bas

        // Newton's Law of Universal Gravitation (vector form)
        // F = G * [(m1 * m2)/(r^2)] * u,
        // where u is the unit vector from particle 1 to particle 2
        // u = (r2 - r1)/|r2 - r1|

        const r = Math.sqrt((p2.x[0] - p1.x[0]) ** 2 + (p2.x[1] - p1.x[1]) ** 2);
        if (r >= 5) {
            const G = 1;
            const u = [(p2.x[0] - p1.x[0]) / r, (p2.x[1] - p1.x[1]) / r];
            const fScalar = G * [(p1.mass * p2.mass) / (r ** 2)]
            const fVector = [fScalar * u[0], fScalar * u[1]];

            p1.a[0] += fVector[0];
            p1.a[1] += fVector[1];
        }

    }
    addParticle(x, v, a, mass, radius) {
        this.particles.push(new Particle(x, v, a, mass, radius));
    }
}