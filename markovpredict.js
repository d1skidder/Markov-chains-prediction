function markovPredictNextHat(p) {
    let ph = p.pastHats;
    let tm = {};
    for (let i = 0; i < ph.length - 1; i++) {
        let cs = ph[i];
        let ns = ph[i + 1];

        let csKey = JSON.stringify({
            h: cs.skin,
            t: cs.tail,
            s: cs.shame,
            p: cs.pr,
            r: cs.sr,
            tr: cs.tr,
            it: cs.inTrap,
            spd: cs.speed
        });

        let nsKey = JSON.stringify({
            h: ns.skin,
            t: ns.tail,
            s: ns.shame,
            p: ns.pr,
            r: ns.sr,
            tr: ns.tr,
            it: ns.inTrap,
            spd: ns.speed
        });

        if (!tm[csKey]) {
            tm[csKey] = {};
        }

        if (!tm[csKey][nsKey]) {
            tm[csKey][nsKey] = 0;
        }

        tm[csKey][nsKey]++;
    }

    let rs = ph[ph.length - 1];

    let rsKey = JSON.stringify({
        h: rs.skin,
        t: rs.tail,
        s: rs.shame,
        p: rs.pr,
        r: rs.sr,
        tr: rs.tr,
        it: rs.inTrap,
        spd: rs.speed
    });

    if (!tm[rsKey]) {
        return -1;
    }

    let nsKey = -1;
    let maxC = 0;

    for (let sk in tm[rsKey]) {
        let count = tm[rsKey][sk];
        if (count > maxC) {
            nsKey = sk;
            maxC = count;
        }
    }

    if (nsKey !== -1) {
        let ns = JSON.parse(nsKey);
        return ns.h;
    }

    return -1;
}
