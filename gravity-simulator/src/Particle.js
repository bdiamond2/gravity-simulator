export class Particle {
    constructor(params) {
        this.x = params.x ? params.x : [0, 0];
        this.v = params.v ? params.v : [0, 0];
        this.a = params.a ? params.a : [0, 0];
        this.mass = params.mass ? params.mass : 1;
        this.radius = params.radius ? params.radius : 5;

        // thank you ChatGPT for the nicely-formatted color array
        const colorArray = [
            "#ffdd00",
            "#ff5733",
            "#a9a9a9",
            "#1e90ff",
            "#ff9900",
            "#d2b48c",
            "#ffcc99",
            "#00ffff",
            "#66ccff",
            "#808080",
            "#ff6666",
            "#99ff99"
        ];

        this.color = params.color ? params.color : colorArray[Math.floor(Math.random() * colorArray.length)];
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
        this.particles = particles ? particles : [];
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
        if (r >= (p1.radius + p2.radius) / 2) {
            const G = 1;
            const u = [(p2.x[0] - p1.x[0]) / r, (p2.x[1] - p1.x[1]) / r];
            const fScalar = G * ((p1.mass * p2.mass) / (r ** 2))
            const fVector = [fScalar * u[0], fScalar * u[1]];

            // F = ma
            // a = F/m
            p1.a[0] += fVector[0] / p1.mass;
            p1.a[1] += fVector[1] / p1.mass;
        }

    }
    addParticle(params) {
        this.particles.push(new Particle(params));
    }
}